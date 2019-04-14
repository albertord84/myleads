<?php

//defined('BASEPATH') OR exit('No direct script access allowed');
namespace leads\cls {
    
require_once 'DB.php';
require_once 'Payment_BD.php';
require_once 'Payment.php';
require_once 'system_config.php';
require_once 'Gmail.php';

class Pre_Payment {   //extends CI_Controller {

    //------------desenvolvido para DUMBU-LEADS-------------------
    public function check_cupom_leads() {
        
        $GLOBALS['sistem_config'] = new system_config();        
        $this->Gmail = new Gmail();
        $BD_access = new Payment_BD();

        while (true){
            $cupom_array = $BD_access->get_array_cupom();
            
            foreach ($cupom_array as $cupom) {
                $client = $BD_access->get_user_by_id($cupom['client_id']);
                $factor_conversion = 1;
                if($client['brazilian'] == 0){                    
                    $factor_conversion = $GLOBALS['sistem_config']->DOLLAR_TO_REAL;
                }
                $datas['credit_card_number'] = $cupom['credit_card_number'];
                $datas['credit_card_name'] = $cupom['credit_card_name'];
                $datas['credit_card_exp_month'] = $cupom['credit_card_exp_month'];
                $datas['credit_card_exp_year'] = $cupom['credit_card_exp_year'];
                $datas['credit_card_cvc'] = $cupom['credit_card_cvc'];
                $datas['amount_in_cents'] = $cupom['amount']*$factor_conversion;

                $resp = $this->check_mundipagg_credit_card($datas); 

                if( is_object($resp) && $resp->isSuccess() ){                    
                    $value_cents = $resp->getData()->CreditCardTransactionResultCollection[0]->CapturedAmountInCents;
                     
                    //mensaje de que fue hecho el cobro
                    echo 'Client '.$cupom['client_id'].' buy a cupom for '.$value_cents.' cents<br>';                     
                    $result_message = $this->Gmail->send_client_response_cupom(
                                                        $client['email'],
                                                        $client['login'],                                                        
                                                        $client['language'],
                                                        $client['brazilian'],
                                                        $value_cents,
                                                        1
                                                    ); 
                    //salvar como boleto bancario pago
                    $BD_access->save_cupom_as_ticket($cupom['client_id'], $value_cents);
                    
                }else{
                    var_dump($resp);
                    //mensaje de que no fue hecho el cobro
                    echo 'Client '.$cupom['client_id'].' fail buying a cupom for '.$cupom['amount']*$factor_conversion.' cents<br>';                     
                    $result_message = $this->Gmail->send_client_response_cupom(
                                                        $client['email'],
                                                        $client['login'],                                                        
                                                        $client['language'],
                                                        $client['brazilian'],
                                                        $datas['amount_in_cents'],
                                                        0
                                                    ); 
                } 
                
                //eliminar de la tabla
                $BD_access->delete_cupom($cupom['id']);
            }
            
            sleep(2*3600); //espera 2 hras para analizar la proxima lista de pedidos de cupones
        }                
    }
    
    public function check_mundipagg_credit_card($datas) {
        //$this->is_ip_hacker();
        //require_once $GLOBALS['sistem_config']->BASE_PATH_URL . '/leads/worker/class/system_config.php';
        //$GLOBALS['sistem_config'] = new system_config();
        //require_once $GLOBALS['sistem_config']->BASE_PATH_URL . '/leads/worker/class/Payment.php';
        $Payment = new Payment();
        $payment_data['credit_card_number'] = $datas['credit_card_number'];
        $payment_data['credit_card_name'] = $datas['credit_card_name'];
        $payment_data['credit_card_exp_month'] = $datas['credit_card_exp_month'];
        $payment_data['credit_card_exp_year'] = $datas['credit_card_exp_year'];
        $payment_data['credit_card_cvc'] = $datas['credit_card_cvc'];
        $payment_data['amount_in_cents'] = $datas['amount_in_cents'];
        $payment_data['pay_day'] = time();        
        $bandeira = $this->detectCardType($payment_data['credit_card_number']);        
        if ($bandeira)
            $response = $Payment->create_payment($payment_data);
        else
            $response = array("message" => "Número de cartão errado");
        
        return $response;
    }    

    public function detectCardType($num) {
        $re = array(
            "visa" => "/^4[0-9]{12}(?:[0-9]{3})?$/",
            "mastercard" => "/^5[1-5][0-9]{14}$/",
            "amex" => "/^3[47][0-9]{13}$/",
            "discover" => "/^6(?:011|5[0-9]{2})[0-9]{12}$/",
            "diners" => "/^3[068]\d{12}$/",
            "elo" => "/^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/",
            "hipercard" => "/^(606282\d{10}(\d{3})?)|(3841\d{15})$/"
        );

        if (preg_match($re['visa'], $num)) {
            return 'Visa';
        } else if (preg_match($re['mastercard'], $num)) {
            return 'Mastercard';
        } else if (preg_match($re['amex'], $num)) {
            return 'Amex';
        } else if (preg_match($re['discover'], $num)) {
            return 'Discover';
        } else if (preg_match($re['diners'], $num)) {
            return 'Diners';
        } else if (preg_match($re['elo'], $num)) {
            return 'Elo';
        } else if (preg_match($re['hipercard'], $num)) {
            return 'Hipercard';
        } else {
            return false;
        }
    }
    
    public function is_ip_hacker(){
        $IP_hackers= array(
            '191.176.169.242', '138.0.85.75', '138.0.85.95', '177.235.130.16', '191.176.171.14', '200.149.30.108', '177.235.130.212', '66.85.185.69',
            '177.235.131.104', '189.92.238.28', '168.228.88.10', '201.86.36.209', '177.37.205.210', '187.66.56.220', '201.34.223.8', '187.19.167.94',
            '138.0.21.188', '168.228.84.1', '138.36.2.18', '201.35.210.135', '189.71.42.124', '138.121.232.245', '151.64.57.146', '191.17.52.46', '189.59.112.125',
            '177.33.7.122', '189.5.107.81', '186.214.241.146', '177.207.99.29', '170.246.230.138', '201.33.40.202', '191.53.19.210', '179.212.90.46', '177.79.7.202',
            '189.111.72.193', '189.76.237.61', '177.189.149.249', '179.223.247.183', '177.35.49.40', '138.94.52.120', '177.104.118.22', '191.176.171.14', '189.40.89.248',
            '189.89.31.89', '177.13.225.38',  '186.213.69.159', '177.95.126.121', '189.26.218.161', '177.193.204.10', '186.194.46.21', '177.53.237.217', '138.219.200.136',
            '177.126.106.103', '179.199.73.251', '191.176.171.14', '179.187.103.14', '177.235.130.16', '177.235.130.16', '177.235.130.16', '177.47.27.207'
            );
        if(in_array($_SERVER['REMOTE_ADDR'],$IP_hackers)){
            die('Error IP: Sua solicitação foi negada. Por favor, contate nosso atendimento');
        }
    }
    
    public function mundi_notif_post() {
        // Write the contents back to the file
        $path = __dir__ . '/../../logs/';
        $file = $path . "mundi_notif_post-" . date("d-m-Y") . ".log";
        //$result = file_put_contents($file, "Albert Test... I trust God!\n", FILE_APPEND);
        $post = file_get_contents('php://input');
        $result = file_put_contents($file, serialize($post) . "\n\n", FILE_APPEND);
//        $result = file_put_contents($file, serialize($_POST['OrderStatus']), FILE_APPEND);
        if ($result === FALSE) {
            var_dump($file);
        }
        //var_dump($file);
        print 'OK';
    }
    
    public function mundi_notif_post_boleto() {
        // Write the contents back to the file
        $path = __dir__ . '/../../logs/';
        $file = $path . "mundi_notif_post-" . date("d-m-Y") . ".log";
        //$result = file_put_contents($file, "Albert Test... I trust God!\n", FILE_APPEND);
        $post = file_get_contents('php://input');
        $result = file_put_contents($file, serialize($post) . "\n\n", FILE_APPEND);
//        $result = file_put_contents($file, serialize($_POST['OrderStatus']), FILE_APPEND);
        if ($result === FALSE) {
            var_dump($file);
        }
        //var_dump($file);
        print 'OK';
    }
    
    public function do_payment($payment_data) {
        require_once $GLOBALS['sistem_config']->BASE_PATH_URL . '/dumbu/worker/class/Payment.php';
        // Check client payment in mundipagg
        $Payment = new \dumbu\cls\Payment();
        $response = $Payment->create_recurrency_payment($payment_data);
        // Save Order Key
        var_dump($response->Data->OrderResult->OrderKey);
    }
    
    public function do_bilhete_payment($payment_data) {
        require_once $GLOBALS['sistem_config']->BASE_PATH_URL . '/dumbu/worker/class/Payment.php';
        // Check client payment in mundipagg
        //$Payment = new \dumbu\cls\Payment();
        $response = $Payment->create_boleto_payment($payment_data);
        // Save Order Key
        var_dump($response->Data->OrderResult->OrderKey);
    }

    public function check_payment() {
        require_once $GLOBALS['sistem_config']->BASE_PATH_URL . '/dumbu/worker/class/system_config.php';
        $GLOBALS['sistem_config'] = new dumbu\cls\system_config();
        echo "Check Payment Inited...!<br>\n";
        echo date("Y-m-d h:i:sa");

        $this->load->model('class/user_model');
        $this->load->model('class/client_model');
        $this->load->model('class/user_role');
        $this->load->model('class/user_status');
        // Get all users
        $this->db->select('*');
        $this->db->from('clients');
        $this->db->join('users', 'clients.user_id = users.id');
        // TODO: COMENT
//        $this->db->where('id', "1");
        $this->db->where('role_id', user_role::CLIENT);
        $this->db->where('status_id <>', user_status::DELETED);
        $this->db->where('status_id <>', user_status::BEGINNER);
        $this->db->where('status_id <>', user_status::DONT_DISTURB);
//        $this->db->where('status_id <>', user_status::BLOCKED_BY_PAYMENT);
        // TODO: COMMENT MAYBE
//        $this->db->or_where('status_id', user_status::BLOCKED_BY_PAYMENT);  // This status change when the client update his pay data
//        $this->db->or_where('status_id', user_status::ACTIVE);
//        $this->db->or_where('status_id', user_status::BLOCKED_BY_INSTA);
//        $this->db->or_where('status_id', user_status::VERIFY_ACCOUNT);
//        $this->db->or_where('status_id', user_status::UNFOLLOW);
//        $this->db->or_where('status_id', user_status::BLOCKED_BY_TIME);
//        $this->db->or_where('status_id', user_status::INACTIVE);
//        $this->db->or_where('status_id', user_status::PENDING);
        $clients = $this->db->get()->result_array();
        // Check payment for each user
        foreach ($clients as $client) {
            $clientname = $client['name'];
            $clientid = $client['user_id'];
            $now = new DateTime("now");
            $payday = strtotime($client['pay_day']);
            $payday = new DateTime();
            $payday->setTimestamp($client['pay_day']);
//            var_dump($payday);
            $promotional_days = $GLOBALS['sistem_config']->PROMOTION_N_FREE_DAYS;
            $init_date_2d = new DateTime();
            $init_date_2d = $init_date_2d->setTimestamp(strtotime("+$promotional_days days", $client['init_date']));
            $testing = new DateTime("now") < $init_date_2d;
            if ($client['order_key'] != NULL) { // wheter have oreder key
                if (!$testing) { // Not in promotial days
                    try {
//                        var_dump($client);
                        $checked = $this->check_client_payment($client);
                    } catch (Exception $ex) {
                        $checked = FALSE;
//                        var_dump($ex);
                    }
                    if ($checked) {
                        //var_dump($client);
                        print "\n<br>Client in day: $clientname (id: $clientid)<br>\n";
                    } else {
                        print "\n<br>----Client with payment issue: $clientname (id: $clientid)<br>\n<br>\n<br>\n";
                    }
                }
            } else if ($now > $payday && $client['status_id'] != user_status::BLOCKED_BY_PAYMENT) { // wheter not have order key
                print "\n<br>Client without ORDER KEY and pay data data expired!!!: $clientname (id: $clientid)<br>\n";
                $this->send_payment_email($client, $GLOBALS['sistem_config']->DAYS_TO_BLOCK_CLIENT - $diff_days);
                $this->load->model('class/user_status');
                $this->user_model->update_user($client['user_id'], array('status_id' => user_status::BLOCKED_BY_PAYMENT, 'status_date' => time()));
            } else {
                print "\n<br>Client without ORDER KEY!!!: $clientname (id: $clientid)<br>\n";
            }            
        }
    try{
        $Gmail = new dumbu\cls\Gmail();
        $Gmail->send_mail("josergm86@gmail.com", "Jose Ramon ",'DUMBU payment checked!!! ','DUMBU payment checked!!! ');
        $Gmail->send_mail("jangel.riveaux@gmail.com", "Jose Angel Riveaux ",'DUMBU payment checked!!! ','DUMBU payment checked!!! ');
    } catch (Exception $ex){  echo 'Emails was not send';}
        echo "\n\n<br>Job Done!" . date("Y-m-d h:i:sa") . "\n\n";
    }

    public function check_client_payment($client) {
        require_once $GLOBALS['sistem_config']->BASE_PATH_URL . '/dumbu/worker/class/Payment.php';
        require_once $GLOBALS['sistem_config']->BASE_PATH_URL . '/dumbu/worker/class/system_config.php';
        $GLOBALS['sistem_config'] = new dumbu\cls\system_config();
        // Check client payment in mundipagg
        $Payment = new \dumbu\cls\Payment();
        $DB = new \dumbu\cls\DB();
        // Check outhers payments
        $IOK_ok = $client['initial_order_key'] ? $Payment->check_client_order_paied($client['initial_order_key']) : TRUE; // Deixar para um mes de graça
        $POK_ok = $client['pending_order_key'] ? $Payment->check_client_order_paied($client['pending_order_key']) : FALSE;
        $IOK_ok = $IOK_ok || $POK_ok; // Whichever is paid
        // Check normal recurrency payment
        $result = $Payment->check_payment($client['order_key']);
        if (is_object($result) && $result->isSuccess()) {
            $data = $result->getData();
            //var_dump($data);
            $SaleDataCollection = $data->SaleDataCollection[0];
            $LastSaledData = NULL;
            // Get last client payment
            foreach ($SaleDataCollection->CreditCardTransactionDataCollection as $SaleData) {
                $SaleDataDate = new DateTime($SaleData->DueDate);
//                $LastSaleDataDate = new DateTime($LastSaledData->DueDate);
                //$last_payed_date = DateTime($LastSaledData->DueDate);
                if ($SaleData->CapturedAmountInCents != NULL && ($LastSaledData == NULL || $SaleDataDate > new DateTime($LastSaledData->DueDate))) {
                    $LastSaledData = $SaleData;
                }
                //var_dump($SaleData);
            }
            $now = DateTime::createFromFormat('U', time());
            $this->load->model('class/user_status');
            $this->load->model('class/user_model');
            if ($LastSaledData != NULL) { // if have payment
                // Check difference between last payment and now
                $last_saled_date = new DateTime($LastSaledData->DueDate);
                $diff_info = $last_saled_date->diff($now);
                //var_dump($diff_info);
                // Diff in days
                $diff_days = $diff_info->days;
//                $diff_days = ($diff_info->m * 30) + $diff_info->days;
                print "\n<br> Diff days: $diff_days";
                // TODO: Put 34 in system_config
//                $diff_days = 35;
//                $client['email'] = 'albertord84@gmail.com';
                if ($diff_days > 34) { // Limit to bolck
                    //Block client by paiment
                    if ($client['status_id'] != user_status::BLOCKED_BY_PAYMENT) {
                        $this->user_model->update_user($client['user_id'], array('status_id' => user_status::BLOCKED_BY_PAYMENT, 'status_date' => time()));
                        $this->send_payment_email($client, 0);
                        print "This client was blocked by payment just now: " . $client['user_id'];
                        // TODO: Put 31 in system_config    
                    }
                } elseif ($diff_days > 31) { // Limit to advice
                    // Send email to Client
                    // TODO: Think about send email
                    print "Diff in days bigger tham 31 days: $diff_days ";
                    $this->load->model('class/dumbu_system_config');
                    $this->send_payment_email($client, 34 - $diff_days + 1);
                    $this->user_model->update_user($client['user_id'], array('status_id' => user_status::PENDING, 'status_date' => time()));
                } else {
//                    print_r($client);
                    if ($client['status_id'] == user_status::PENDING || $client['status_id'] == user_status::BLOCKED_BY_PAYMENT) {
                        $this->user_model->update_user($client['user_id'], array('status_id' => user_status::ACTIVE, 'status_date' => time()));
                        $DB->InsertEventToWashdog($client['user_id'], 'SET TO ATIVE', 0);
               
                    }
                    return TRUE;
                }
            } else if ($client['status_id'] != user_status::BLOCKED_BY_PAYMENT) { // if have not payment jet
                print "\n<br> LastSaledData = NULL";
                $pay_day = new DateTime();
                $pay_day->setTimestamp($client['pay_day']);
                $diff_info = $pay_day->diff($now);
                $diff_days = $diff_info->days;
//                $diff_days = ($diff_info->m * 30) + $diff_info->days;
                // TODO: check whend not pay and block user
                if ($now > $pay_day) {
                    print "\n<br>This client has not payment since '$diff_days' days (PROMOTIONAL?): " . $client['name'] . "<br>\n";
                    print "\n<br>Set to PENDING<br>\n";
                    $this->user_model->update_user($client['user_id'], array('status_id' => user_status::PENDING, 'status_date' => time()));
                   $DB->InsertEventToWashdog($client['user_id'], 'SET TO PENDING',0);
               
                    // TODO: limit email by days diff
                    //$diff_days = 6;
                    if ($diff_days >= 0) {
//                        print "\n<br>Email sent to " . $client['email'] . "<br>\n";
                        $this->load->model('class/dumbu_system_config');
                        $this->send_payment_email($client, dumbu_system_config::DAYS_TO_BLOCK_CLIENT - $diff_days);
                        // TODO: limit email by days diff
                        if ($diff_days >= dumbu_system_config::DAYS_TO_BLOCK_CLIENT) {
                            //Block client by paiment
                            $this->user_model->update_user($client['user_id'], array('status_id' => user_status::BLOCKED_BY_PAYMENT, 'status_date' => time()));
                            $DB->InsertEventToWashdog($client['user_id'], 'BLOQUED BY PAYMENT', 0);
 
                            ///////////////////////////////////////$this->send_payment_email($client);
                            print "This client was blocked by payment just now: " . $client['user_id'];
                            // TODO: Put 31 in system_config    
                        }
                    }
                } else if ($IOK_ok === FALSE && $diff_days >= dumbu_system_config::PROMOTION_N_FREE_DAYS) { // Si está en fecha de promocion del mes pero no pagó initial order key
                    //Block client by paiment
                    $this->user_model->update_user($client['user_id'], array('status_id' => user_status::BLOCKED_BY_PAYMENT, 'status_date' => time()));
                    $this->send_payment_email($client, 0);
                    $DB->InsertEventToWashdog($client['user_id'], 'BLOQUED BY PAYMENT', 0);
               
                    ///////////////////////////////////////$this->send_payment_email($client);
                    print "This client was blocked by payment just now: " . $client['user_id'];
                }
            }
            // Caso especial para activar bloqueados injustamente
            $pay_day = new DateTime();
            $pay_day->setTimestamp($client['init_date']);
            $diff_info = $pay_day->diff($now);
            $diff_days = $diff_info->days;
            if ($client['status_id'] == user_status::BLOCKED_BY_PAYMENT && ($IOK_ok === TRUE && $client['initial_order_key']) && $diff_days < 33) { // Si está en fecha de promocion del mes y initial order key
                print "\n<br> LastSaledData = NULL";
                $this->user_model->update_user($client['user_id'], array('status_id' => user_status::ACTIVE, 'status_date' => time()));
                $DB->InsertEventToWashdog($client['user_id'], 'UNBLOQUED BY PAYMENT', 0);
               
                print "\n<br>This client UNBLOQUED by payment just now: " . $client['user_id'];
            }
        } else {
            $bool = is_object($result);
            $str = is_object($result) && is_callable($result->getData()) ? json_encode($result->getData()) : "NULL";
//            throw new Exception("Payment error: " . $str);
            print ("\n<br>Payment error: " . $str . " \nClient name: " . $client['name'] . "<br>\n");
        }
        return FALSE;
//        print "<pre>";
//        print json_encode($result->getData(), JSON_PRETTY_PRINT);
//        print "</pre>";
    }

    public function send_payment_email($client, $diff_days = 0) {
        require_once $GLOBALS['sistem_config']->BASE_PATH_URL . '/dumbu/worker/class/Gmail.php';
        require_once $GLOBALS['sistem_config']->BASE_PATH_URL . '/dumbu/worker/class/system_config.php';
        $GLOBALS['sistem_config'] = new \dumbu\cls\system_config();
        $this->Gmail = new \dumbu\cls\Gmail();
        //$datas = $this->input->post();
        $result = $this->Gmail->send_client_payment_error($client['email'], $client['name'], $client['login'], $client['pass'], $diff_days);
        if ($result['success']) {
            $clientname = $client['name'];
            print "<br>Email send to client: $clientname<br>";
        } else {
            print "<br>Email NOT sent to: " . json_encode($client, JSON_PRETTY_PRINT);
//            throw new Exception("Email not sent to: " . json_encode($client));
        }
    }

    function retry_payment($order_key) {
        $result = $this->check_payment($order_key);
        $now = DateTime::createFromFormat('U', time());
        if (is_object($result) && $result->isSuccess()) {
            $data = $result->getData();
            //var_dump($data);
            $SaleDataCollection = $data->SaleDataCollection[0];
            $RetrySaleData = NULL;
            // Get last client payment
            foreach ($SaleDataCollection->CreditCardTransactionDataCollection as $SaleData) {
                $SaleDataDate = new DateTime($SaleData->DueDate);
                if (($RetrySaleData == NULL || $SaleDataDate > new DateTime($RetrySaleData->DueDate)) && $SaleDataDate < $now) {
                    $RetrySaleData = $SaleData;
                }
            }
        }

        if ($RetrySaleData && $RetrySaleData->CapturedAmountInCents == NULL) {
            //var_dump($RetrySaleData->TransactionKey);
            $result = $this->retry_payment_recurrency($order_key, $RetrySaleData->TransactionKey);
            if (is_object($result) && $result->isSuccess()) {
                $result = $result->getData();
                $RetriedSaleData = $result->CreditCardTransactionResultCollection[0];
                if ($RetriedSaleData->CapturedAmountInCents > 100) {
                    return TRUE;
                }
            }
//        print "<pre>";
//        print json_encode($result, JSON_PRETTY_PRINT);
//        print "</pre>";
        }
        return FALSE;
    }

    //JOSE RAMON developing
    public function process_notification($notification) {
        //$notification
        $this->load->model('class/user_model');
        $this->load->model('class/client_model');
    }

    
}

}

?>