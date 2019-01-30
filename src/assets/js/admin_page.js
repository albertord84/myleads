$(document).ready(function () {    
       
    function modal_alert_message(text_message){
        $('#modal_alert_message').modal('show');
        $('#message_text').text(text_message);        
    }
    
    $("#accept_modal_alert_message").click(function () {
        $('#modal_alert_message').modal('hide');
    });
    
    //------------desenvolvido para DUMBU-LEADS-------------------    
    $('#login_container1').keypress(function (e) {
        if (e.which == 13) {
            $("#execute_query").click();
            return false;
        }
    });
    
    $("#do_logout").click(function () {                
        $.ajax({
            url: base_url + 'index.php/admin/logout',            
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response['success']) {                    
                    $(location).attr('href',base_url);
                } else {
                      modal_alert_message(response['message']);
                }
            },
            error: function (xhr, status) {
//                $('#container_sigin_message').text('Não foi possível executar sua solicitude!');
//                $('#container_sigin_message').css('visibility', 'visible');
//                $('#container_sigin_message').css('color', 'red');
            }
        });                            
    });
    
    $("#execute_query_email").click(function () {
    
    var status_id = Number($('#client_status').val());
    var asn_date_from = $('#assin_date_from1').val();
    var client_id=$('#client_id1').val();
    var asn_date_to=$('#assin_date_to1').val();
    var date_from = $('#status_date_from1').val();
    var date_to=$('#status_date_to1').val();
    var prf_client1 = $('#profile_client1').val();
    var eml_client1=$('#email_client1').val();
    var card_name = $('#credit_card_name1').val();
    var cod_prom=$('#cod_promocional1').val();
    var lst_access1=$('#last_access1').val();
    var lst_access3=$('#last_access3').val();
    var lst_access2=$('#last_access2').val();
    var lst_access4=$('#last_access4').val();
    var campaigns_from=$('#campaigns_from').val();
    var campaigns_to=$('#campaigns_to').val();
    //var checu=document.getElementById('usecard');
    var checc=document.getElementById('createcampaing');
    var req_card=Number( $('#payments_types').val());
    //var req_cam=Boolean(checc.checked);
    var req_cam='';
    if(checc.checked)
        req_cam=true;
    //var verify=!(!card_name&&!eml_client1&&!prf_client1);
    var verify=false;
        $.ajax({
            url: base_url + 'index.php/admin/show_users', 
            data:  {
                        'status_id': status_id,
                        'language': language, 
                        'client_id': client_id,
                        'asn_date_from': asn_date_from,
                        'asn_date_to':asn_date_to,
                        'date_from':date_from,
                        'date_to':date_to,
                        'prf_client1':prf_client1,
                        'eml_client1':eml_client1,
                        'card_name':card_name,
                        'cod_prom':cod_prom,
                        'lst_access1':lst_access1,
                        'lst_access3':lst_access3,
                        'lst_access2':lst_access2,
                        'lst_access4':lst_access4,
                        'req_card':req_card,
                        'req_cam':req_cam,
                        'campaigns_from':campaigns_from,
                        'campaigns_to':campaigns_to
                    }, 
            type: 'POST',
            dataType: 'json',
            success: function (response) 
            {
                if (response['success']) { 
                    var users = response['users_array'];
                    var i, num_users = users.length;
                    var html = "";
                    var options_trd=response['options'];
//                    for(i = 0; i < num_users; i++){
//                        html += '<div id="user_'+users[i]['id']+'" >';
//                            html += '<b>login: </b>' + users[i]['login']+'<br>';
//                            html += '<b>status: </b>' + users[i]['status_id']+'<br>';
//                            html += '<b>data: </b>' + toDate(users[i]['init']) + '<br><br>';
//                            html += '<b>email: </b>' + users[i]['end']+'<br>'
//                            html += '---------------------------------- <br>';
//
//                                                html += '</div>';
//                    }
            //html+='<div class="row">';
            //html+='<div class="col-md-2">';
            html+='<div id="user_form" class="row">';
            html+=    '<div class="col-md-1"></div>';
            html+=    '<div class="col-md-2">';

            html+='<br><p><b style="color:red">Total de registros: </b><b id="total_users">';
            //if(verify)
            //    html+=num_users;
            html+='</b></p><br>';
            
            html+='</div>';
            /*html+=    '<div class="col-md-1"></div>';
            html+=    '<div class="col-md-2" id="totalpago">';
            html+='<br><p><b style="color:red">Pagamento Total: </b><b id="totalpayment"></b></p><br>';
            html+='</div>';*/
            html+='</div>';
            html+='<div class="row">';
            html+='<div class="col-xs-10" style="margin-left: 100px;">';
            html+='<table class="table">';
            html+='<tr class="list-group-item-success">';
            html+='<td style="text-align:left; width:100%; padding:5px"><b>Emails</b></td>';
            /*html+='<td style="text-align:left; width:40%; padding:5px"><b>Dados gerais</b></td>';
            html+='<td style="text-align:left; width:30%; padding:5px"><b>Estado atual</b></td>';
            html+='<td style="text-align:left; width:20%; padding:5px"><b>Operações</b></td>';*/
            html+='</tr>';
            html+='</table>';
            html+='</div>';
            html+='</div>';
            var sel='</select>';
            var cont_users=new Array(num_users);
            var total_users=0;
                   /* for(var i = 0; i < num_users; i++){
                        //html+=''
                           cont_users[users[i]['user_id']]=0;
                            payment_users[users[i]['user_id']]=0;
                        }*/        
            
            html+='<div id="tablausers">';//class="row"
            html+='<div class="col-xs-10" style="margin-left: 100px;">';
            html+='<table class="table">';
            /*var y,z;
            if(num_users>1)
            {    
              for (y in users[0]){
                z=y;
                            
              }      
            }
             y=z; */   
                    for(var i = 0; i < num_users; i++){

                        //html+=''
                        if((typeof cont_users[users[i]['user_id']]=="undefined")||verify)
                        {  
                            total_users++;
                            cont_users[users[i]['user_id']]=1;
                            html+= '<tr class="list-group-item-success" id="row-client_'+users[i]['user_id']+'" style="';//visibility: visible;display: block'; 
                            html+='; background-color: white';
                            html+= '">';
                                    html+= '<td style="text-align:left; width:100%; padding:5px">';
                                    html+= users[i]['email'];
                                    html+='</td>';                                
                               
                                   
                                    html+='</tr>';

                                    //html+='<br>';
                                }
                        
                        
                    }
                    html+='</table>';
                    html+='</div>';
                    html+='</div>';
                    document.getElementById("container_users1").innerHTML = html;
                      //document.getElementById('totalpayment').innerHTML=z1.toLocaleString('de-DE', { style: 'currency', currency: 'USD' });  
                      document.getElementById('total_users').innerHTML=total_users.toString();
                } else {
                    document.getElementById("container_users1").innerHTML = "";  
                    modal_alert_message(response['message']);
                }
            },
            error: function (xhr, status) {
//                $('#container_sigin_message').text('Não foi possível executar sua solicitude!');
//                $('#container_sigin_message').css('visibility', 'visible');
//                $('#container_sigin_message').css('color', 'red');
            }
        });                            
        
        
    });
    
    $("#execute_query").click(function () { 
    var status_id = Number($('#client_status').val());
    var asn_date_from = $('#assin_date_from1').val();
    var client_id=$('#client_id1').val();
    var asn_date_to=$('#assin_date_to1').val();
    var date_from = $('#status_date_from1').val();
    var date_to=$('#status_date_to1').val();
    var prf_client1 = $('#profile_client1').val();
    var eml_client1=$('#email_client1').val();
    var card_name = $('#credit_card_name1').val();
    var cod_prom=$('#cod_promocional1').val();
    var lst_access1=$('#last_access1').val();
    var lst_access3=$('#last_access3').val();
    var lst_access2=$('#last_access2').val();
    var lst_access4=$('#last_access4').val();
    var campaigns_from=$('#campaigns_from').val();
    var campaigns_to=$('#campaigns_to').val();
    //var checu=document.getElementById('usecard');
    var checc=document.getElementById('createcampaing');
    var req_card=Number( $('#payments_types').val());
    //var req_cam=Boolean(checc.checked);
    var req_cam='';
    if(status_id<0)
       status_id=0; 
    if(checc.checked)
        req_cam=true;
    //var verify=!(!card_name&&!eml_client1&&!prf_client1);
    var verify=false;
        $.ajax({
            url: base_url + 'index.php/admin/show_users', 
            data:  {
                        'status_id': status_id,
                        'language': language, 
                        'client_id': client_id,
                        'asn_date_from': asn_date_from,
                        'asn_date_to':asn_date_to,
                        'date_from':date_from,
                        'date_to':date_to,
                        'prf_client1':prf_client1,
                        'eml_client1':eml_client1,
                        'card_name':card_name,
                        'cod_prom':cod_prom,
                        'lst_access1':lst_access1,
                        'lst_access3':lst_access3,
                        'lst_access2':lst_access2,
                        'lst_access4':lst_access4,
                        'req_card':req_card,
                        'req_cam':req_cam,
                        'campaigns_from':campaigns_from,
                        'campaigns_to':campaigns_to
                    }, 
            type: 'POST',
            dataType: 'json',
            success: function (response) 
            {
                if (response['success']) { 
                    var users = response['users_array'];
                    var i, num_users = users.length;
                    var html = "";
                    var options_trd=response['options'];
//                    for(i = 0; i < num_users; i++){
//                        html += '<div id="user_'+users[i]['id']+'" >';
//                            html += '<b>login: </b>' + users[i]['login']+'<br>';
//                            html += '<b>status: </b>' + users[i]['status_id']+'<br>';
//                            html += '<b>data: </b>' + toDate(users[i]['init']) + '<br><br>';
//                            html += '<b>email: </b>' + users[i]['end']+'<br>'
//                            html += '---------------------------------- <br>';
//
//                                                html += '</div>';
//                    }
            //html+='<div class="row">';
            //html+='<div class="col-md-2">';
            html+='<div id="user_form" class="row">';
            html+=    '<div class="col-md-1"></div>';
            html+=    '<div class="col-md-2">';

            html+='<br><p><b style="color:red">Total de registros: </b><b id="total_users">';
            //if(verify)
            //    html+=num_users;
            html+='</b></p><br>';
            
            html+='</div>';
            html+=    '<div class="col-md-1"></div>';
            html+=    '<div class="col-md-2" id="totalpago">';
            html+='<br><p><b style="color:red">Pagamento Total: </b><b id="totalpayment"></b></p><br>';
            html+='</div>';
            html+='</div>';
            html+='<div class="row">';
            html+='<div class="col-xs-10" style="margin-left: 100px;">';
            html+='<table class="table">';
            html+='<tr class="list-group-item-success">';
            html+='<td style="text-align:left; width:10%; padding:5px"><b>No.</b></td>';
            html+='<td style="text-align:left; width:40%; padding:5px"><b>Dados gerais</b></td>';
            html+='<td style="text-align:left; width:30%; padding:5px"><b>Estado atual</b></td>';
            html+='<td style="text-align:left; width:20%; padding:5px"><b>Operações</b></td>';
            html+='</tr>';
            html+='</table>';
            html+='</div>';
            html+='</div>';
            var sel='</select>';
            var cont_users=new Array(num_users);
            var payment_users=new Array(num_users);
            var code_payment=new Array(num_users);
            var totalpayment=0;
            var total_users=0;
                   /* for(var i = 0; i < num_users; i++){
                        //html+=''
                           cont_users[users[i]['user_id']]=0;
                            payment_users[users[i]['user_id']]=0;
                        }*/        
            
            html+='<div id="tablausers">';//class="row"
            html+='<div class="col-xs-10" style="margin-left: 100px;">';
            html+='<table class="table">';
            /*var y,z;
            if(num_users>1)
            {    
              for (y in users[0]){
                z=y;
                            
              }      
            }
             y=z; */   
                    for(var i = 0; i < num_users; i++){

                        //html+=''
                        if((typeof cont_users[users[i]['user_id']]=="undefined")||verify)
                        {  
                         cont_users[users[i]['user_id']]=1;
                         code_payment[users[i]['user_id']]=new Array(num_users);
                         payment_users[users[i]['user_id']]=0;
                          if(!verify)
                          {
                            total_users++;
                            payment_users[users[i]['user_id']]=0;
                            payment_users[users[i]['user_id']]+=Number(users[i]['amount_in_cents']);
                            totalpayment+=Number(users[i]['amount_in_cents']);
                            code_payment[users[i]['user_id']][users[i]['date']]=1;
                          }  
                            html+= '<tr class="list-group-item-success" id="row-client_'+users[i]['user_id']+'" style="';//visibility: visible;display: block'; 
                            var jot=total_users % 2;
                            if (jot == 1) 
                            {html+='; background-color: #dff0d8';}
                            else
                            {html+='; background-color: white';}
                            html+= '">';
                                html+= '<td style="text-align:left; width:10%; padding:5px">';
                                    var k=total_users;
                                    var segme='<b>'+k;
                                    html+= segme; html+='</b>';
                                    html+='</td>';                                
                                    html+= '<td style="text-align:left; width:40%; padding:5px">';
                                    html+='<b>Id do cliente: </b>'+users[i]['user_id']+'<br>';
                                    //html+='<b>Dumbu ID: </b><input type="text" name="naminprobdumbuid_'+users[i]['id'];
                                    //html+='" id= "idinprobdumbuid_'+users[i]['id'];
                                    //html+='" value="'+users[i]['id']+'"><br><br>';
                                    html+='<b>Perfil do cliente: </b>'+users[i]['login']+'<br>';
                                    //html+='<b>Profile: </b><input type="text" name="naminprobprofile_'+users[i]['id'];
                                    //html+='" id= "idinprobprofile_'+users[i]['id'];
                                    //html+='" value="'+users[i]['login']+'"><br><br>';
                             
                                    //html+='<b>Password: </b>'+users[i]['pass']+'<br>';
                                    html+='<b>Email do cliente: </b>'+users[i]['email']+'<br>';
                                    //html+='<b>Password: </b><input type="text" name="naminprobpass_'+users[i]['id'];
                                    //html+='" id= "idinprobpass_'+users[i]['id'];
                                    //html+='" value="'+users[i]['pass']+'"><br><br>';
                                    
                                    //html+='<b>DS ID:</b>'+users[i]['ds_user_id']+'<br>';
                                    //html+='<b>DS ID: </b><input type="text" name="naminprobdsid_'+users[i]['id'];
                                    //html+='" id= "idinprobdsid_'+users[i]['id'];
                                    //html+='" value="'+users[i]['ds_user_id']+'"><br><br>';
                             
                                    html+='<b>Telefono: </b>'+users[i]['telf']+'<br>';
                                    //html+='<b>Tema: </b><input type="text" name="naminprobtheme_'+users[i]['id'];
                                    //html+='" id= "idinprobtheme_'+users[i]['id'];
                                    //html+='" value="'+users[i]['profile_theme']+'"><br><br>';
                                    //html+='<b>Nome no cartão: </b>'+users[i]['credit_card_name']+'<br>';
                                    //html+='<div class="col-md-2" id="totalpago_'+users[i]['user_id']+'">';
                                    //html+='<b style="color:red">Pagamento Total: </b><div id="totalpayment_'+users[i]['user_id']+'">0</div></div>';
                             
                                    //html+='<b>Recobrar conta usando email: </b><br><input type="text" name="naminprobaccountemail_'+users[i]['id'];
                                    //html+='" id= "idinprobaccountemail_'+users[i]['id'];
                                    //html+='" value="'+users[i]['recuperation_email_account']+'"><br><br>';
                             
                                    
                                    //html+='<input id="idseldsid_'+users[i]['id']+'" name="nameseledsid_'+users[i]['id'];
                                    //html+='" type="date" class="user_atribute" value="';
                                    //html+=toDate(users[i]['ds_user_id'])+'">';
                                    //html+='</input>';
                                    html+='</td>';
                                    //echo '<b>Email: </b>'.$result[$i]['email'].'<br>';
                                    //if ($SERVER_NAME == "ONE")
                                    //    echo '<b>Idioma: </b>'.$result[$i]['language'].'<br><br>';
                                    //else echo '<br>';
                                    //echo '<b>Status: </b><b id="label_status_'.$result[$i]['user_id'].'" style="color:red">'.get_name_status($result[$i]['status_id']).'</b><br>';
                                    html+= '<td style="text-align:left; width:30%; padding:5px">';
                                    var nid=users[i]['status_id'];
                                    //html+='<div class="col-md-2">'
                                    html+='<b>Data de incio: </b>'+toDate(users[i]['init_date']).toString()+'<br>';
                                    html+='<b>Status: </b>'+users[i]['st_name']+'<br>';
                        /*          html+='<select class="user_atribute" id="idselestatus_'+users[i]['user_id'];
                                    html+='" name="nameselestatus_'+users[i]['user_id']+'" value="'+users[i]['status_id'];
                                    html+='">';
                                    var html1='';
                                    html1=options_trd;
                                    html1=html1.replace('"'+users[i]['status_id']+'"','"'+users[i]['status_id']+'" selected');
                                    html+=html1;
                                    html+='</select>';
                                    html+='</div>';*/                                    
                                    html+='<b>Data do status: </b>'+toDate(users[i]['status_date']).toString()+'<br>';
                                    html+='<div id="totalpago_'+users[i]['user_id']+'"></div><br>';
                                    //html+='<br>';
                                    //html+='</div>';
                                    //html+='<br>';
                                    //html+='<b>Data de inicio: </b><br>';
                                    //html+='<input id="idselinit_'+users[i]['id']+'" name="nameseleinit_'+users[i]['id'];
                                    //html+='" type="date" class="user_atribute" value="';
                                          //html+=toDate(users[i]['init'])+'">';
                                    //var datemp=toDate(users[i]['init']);
                                    //var atrib=datemp.split('/',4);
                                    //var a=atrib[2];
                                    //var m=atrib[1];
                                    //var d=atrib[0];
                                    //html+=a+'-'+m+'-'+d+'">';
                                    //html+='</input>';
                                    //html+='<br>';
                                    //html+='<b>Data final: </b><br>';
                                    //html+='<input id="idselend_'+users[i]['id']+'" name="nameselend_'+users[i]['id'];
                                    //html+='" type="date" class="user_atribute" value="';
                                    //var datemp=toDate(users[i]['end']);
                                    //datemp=toDate(users[i]['end']);
                                    //atrib=datemp.split('/',4);
                                    //a=atrib[2];
                                    //m=atrib[1];
                                    //d=atrib[0];
                                    //html+=a+'-'+m+'-'+d+'">';
                                    //html+=datemp+'">';
                                    //html+='</input>';
                                    html+='</td>';
                                    html+= '<td style="text-align:left; width:20%; padding:5px">';
                                    /*html+='<button  style="min-width:150px" id = "idbtnapply_'+users[i]['user_id']+'" name="namebtnapply_'+users[i]['user_id'];
                                    html+='" type="button" class="userok"  data-spinner-color="#ffffff">';//data-style="expand-left" 
                                    //html+='<span class="ladda-label">Ok</span>';
                                    html+='Salvar status</button>';
                                    html+='<br>';
                                    html+='<br>';
                                    html+='<button  style="min-width:150px" id = "idbtndiscard_'+users[i]['user_id']+'" name="namebtndiscard_'+users[i]['user_id'];
                                    html+='" type="button" class="usercancel"  data-spinner-color="#ffffff">';//data-style="expand-left" 
                                    //btn btn-success ladda-button
                                    //html+='<span class="ladda-label">Cancel</span>';
                                    html+='Cancel</button>';
                                    html+='<br>';
                                    html+='<br>';*/
                                    html+='<button  style="min-width:150px" id = "idbtnlogin_'+users[i]['user_id']+'" name="namebtnlogin_'+users[i]['user_id'];
                                    html+='" type="button" target="_blank" class="do_login_user"  data-spinner-color="#ffffff">';//data-style="expand-left" 
                                    //btn btn-success ladda-button
                                    //html+='<span class="ladda-label">Cancel</span>';
                                    html+='Login</button>';
                                    html+='</td>';
                               
                                   
                                    html+='</tr>';

                                    //html+='<br>';
                                }
                                else
                                {
                                    if(typeof code_payment[users[i]['user_id']][users[i]['date']]=="undefined")
                                    {    
                                     payment_users[users[i]['user_id']]+=Number(users[i]['amount_in_cents']);
                                     totalpayment+=Number(users[i]['amount_in_cents']);
                                     code_payment[users[i]['user_id']][users[i]['date']]=1;
                                    }
                                }
                        
                        
                    }
                    html+='</table>';
                    html+='</div>';
                    html+='</div>';
                    document.getElementById("container_users1").innerHTML = html;
                    if(!verify)
                    {
                      var z1=totalpayment/100;
                      document.getElementById('totalpayment').innerHTML=z1.toLocaleString('de-DE', { style: 'currency', currency: 'USD' });  
                      document.getElementById('total_users').innerHTML=total_users.toString();
                    }
                    else
                    {    
                      document.getElementById('totalpago').innerHTML='';
                      document.getElementById('total_users').innerHTML=num_users.toString();
                    }  
                    var h;
                    for( h in   cont_users)
                    {
                        if(verify)
                        {
                            document.getElementById('totalpago_'+h.toString()).innerHTML='';
                        }
                        else
                        {
                            var z=Number(payment_users[h]/100);
                            document.getElementById('totalpago_'+h.toString()).innerHTML='<b>Pagamento Total: </b>'+z.toLocaleString('de-DE',{ style: 'currency', currency: 'USD' });//z.toLocaleString('de-DE', { style: 'currency', decimal: '2' });
                        }    
                    }    
                    //modal_alert_message("Existen "+num_users+" usuarios a mostrar");
                } else {
                    document.getElementById("container_users1").innerHTML = "";  
                    modal_alert_message(response['message']);
                }
            },
            error: function (xhr, status) {
//                $('#container_sigin_message').text('Não foi possível executar sua solicitude!');
//                $('#container_sigin_message').css('visibility', 'visible');
//                $('#container_sigin_message').css('color', 'red');
            }
        });                            
    });

    $(document).on('click', '.do_login_user', function(){                
        var id_element = $(this).attr('id');
        var res = id_element.split("_");
        var id_user = res[res.length-1];
        
        $.ajax({
            url: base_url + 'index.php/admin/login_user',
            data:  {
                'id_user': id_user                          
            },   
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response['success']) {                                
                    var url = base_url+'index.php/welcome/'+response['resource'];
                    window.open(url);
                } else {
                      modal_alert_message(response['message']);
                }
            },
            error: function (xhr, status) {
                modal_alert_message(T('Não foi possível executar sua solicitude!',language));                
            }
        });                          
    });
    
    $("#do_payed_ticket").click(function () { 
        var order_number = $('#order_number').val();        
        var valor_pago = $('#valor_pago').val();
        valor_pago = valor_pago.replace(",", "."); 
        var data_pago = $('#data_pago').val();
        
        /*if(order_number.trim() != "" && valor_pago.trim() != "" && data_pago.trim() != ""){
            if( (validate_element('#valor_pago', "^[1-9][0-9]*([\.,][0-9]{1,2})?$") ||
                    validate_element('#valor_pago', "^[0][\.,][1-9][0-9]?$") ||
                    validate_element('#valor_pago', "^[0][\.,][0-9]?[1-9]$"))) {*/
        if(true){if(true){
                $.ajax({
                    url: base_url + 'index.php/admin/payed_ticket',
                    data:  {
                        'order_number': order_number,                          
                        'valor_pago': valor_pago*100,                         
                        'data_pago': toTimestamp(data_pago)                          
                    },   
                    type: 'POST',
                    dataType: 'json',
                    success: function (response) {
                        if (response['success']) {                                
                            modal_alert_message(response['message']);
                        } else {
                              modal_alert_message(response['message']);
                        }
                    },
                    error: function (xhr, status) {
                        modal_alert_message(T('Não foi possível executar sua solicitude!',language));                
                    }
                });                          
            }
            else{
                modal_alert_message('O valor pago deve ser um valor monetário');
            }
        }
        else{
            modal_alert_message('Deve preencher todos os dados corretamente');
        }
    });
    
    /* Generic Confirm func */
    function confirm(heading, question, cancelButtonTxt, okButtonTxt, callback) {

    var confirmModal = 
      $('<div class="modal fade" style="top:30%" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +        
          '<div class="modal-dialog modal-sm" role="document">' +
          '<div class="modal-content">' +
          '<div class="modal-header">' +
            '<button id="btn_modal_close" type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                '<img src="'+base_url+'assets/img/FECHAR.png">'+
            '</button>' +
            '<h5 class="modal-title"><b>' + heading +'</b></h5>' +
          '</div>' +

          '<div class="modal-body">' +
            '<p>' + question + '</p>' +
          '</div>' +

          '<div class="modal-footer">' +            
            '<button id="okButton" type="button" class="btn btn-default active text-center ladda-button" data-style="expand-left" data-spinner-color="#ffffff">'+
                        '<spam class="ladda-label"><div style="color:white; font-weight:bold">'+
                            okButtonTxt+
                        '</div></spam>'+
            '</button>'+
            '<a href="#!" class="btn" data-dismiss="modal">' + 
              cancelButtonTxt + 
            '</a>' +
          '</div>' +
          '</div>' +
          '</div>' +
        '</div>');

    confirmModal.find('#okButton').click(function(event) {
      callback();
      confirmModal.modal('hide');
    }); 

    confirmModal.modal('show');    
    };  
    /* END Generic Confirm func */
 
    function confirm_arg(heading, question, cancelButtonTxt, okButtonTxt, callback, args) {

    var confirmModal = 
      $('<div class="modal fade" style="top:30%" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +        
          '<div class="modal-dialog modal-sm" role="document">' +
          '<div class="modal-content">' +
          '<div class="modal-header">' +
            '<button id="btn_modal_close" type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                '<img src="'+base_url+'assets/img/FECHAR.png">'+
            '</button>' +
            '<h5 class="modal-title"><b>' + heading +'</b></h5>' +
          '</div>' +

          '<div class="modal-body">' +
            '<p>' + question + '</p>' +
          '</div>' +

          '<div class="modal-footer">' +            
            '<button id="okButton2" type="button" class="btn btn-default active text-center ladda-button" data-style="expand-left" data-spinner-color="#ffffff">'+
                        '<spam class="ladda-label"><div style="color:white; font-weight:bold">'+
                            okButtonTxt+
                        '</div></spam>'+
            '</button>'+
            '<a href="#!" class="btn" data-dismiss="modal">' + 
              cancelButtonTxt + 
            '</a>' +
          '</div>' +
          '</div>' +
          '</div>' +
        '</div>');

        confirmModal.find('#okButton2').click(function(event) {
        callback(args);
        confirmModal.modal('hide');
    }); 

    confirmModal.modal('show');    
  };  
    /* END Generic Confirm func */
   
});
   
function reset_element(element_selector, style) {
    $(element_selector).css("border", style);
}   

function validate_element(element_selector, pattern) {
        if (!$(element_selector).val().match(pattern)) {
            $(element_selector).css("border", "1px solid red");
            return false;
        } else {
            $(element_selector).css("border", "1px solid gray");
            return true;
        }
    }
    
function toTimestamp(strDate){
    if(!strDate)
        return null;
    var datum = Date.parse(strDate);
    return datum/1000;
}


function validate_month(element_selector, pattern) {
    if (!$(element_selector).val().match(pattern) || Number($(element_selector).val()) < 1 || Number($(element_selector).val()) > 12) {
        $(element_selector).css("border", "1px solid red");
        return false;
    } else {
        $(element_selector).css("border", "1px solid gray");
        return true;
    }
}

function validate_year(element_selector, pattern) {
    if (!$(element_selector).val().match(pattern) || Number($(element_selector).val()) < 2018) {
        $(element_selector).css("border", "1px solid red");
        return false;
    } else {
        $(element_selector).css("border", "1px solid gray");
        return true;
    }
}

function validate_date(month, year) {
    var d=new Date();        
    if (year < d.getFullYear() || (year == d.getFullYear() && month <= d.getMonth()+1)){
        return false;
    }
    return true;
}

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

function message_container(message, container, color){
    $(container).text(message);                                            
    $(container).css('visibility','visible');
    $(container).css('color', color);
}   

function concert_especial_char(str){
    str.replace(String.fromCharCode(46),String.fromCharCode(92,46));
    return str;
}

function toDate(number){    
    var a = new Date(number*1000);
    var year = a.getFullYear();
    var month = a.getMonth()+1;
    if(month <= 9)
        month = '0'+month;
    
    var date = a.getDate();
    if(date <= 9)
        date = '0'+date;
    var t = date + '/' + month + '/' + year;
    return t;
}

function real_date(number){
    var a = new Date(number);
    var year = a.getFullYear();
    var month = a.getMonth()+1;
    if(month <= 9)
        month = '0'+month;
    var date = a.getDate();        
    var t = month + '/' + date + '/' + year; 
    
    var datum = Date.parse(t);
    return datum;
}

    function numberFormat(numero){

        // Variable que contendra el resultado final

        var resultado = "";

 

        // Si el numero empieza por el valor "-" (numero negativo)

        if(numero[0]=="-")

        {

            // Cogemos el numero eliminando los posibles puntos que tenga, y sin

            // el signo negativo

            nuevoNumero=numero.replace(/\./g,'').substring(1);

        }else{

            // Cogemos el numero eliminando los posibles puntos que tenga

            nuevoNumero=numero.replace(/\./g,'');

        }

 

        // Si tiene decimales, se los quitamos al numero

        if(numero.indexOf(",")>=0)

            nuevoNumero=nuevoNumero.substring(0,nuevoNumero.indexOf(","));

 

        // Ponemos un punto cada 3 caracteres

        for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++)

            resultado = nuevoNumero.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + resultado;

 

        // Si tiene decimales, se lo añadimos al numero una vez forateado con 

        // los separadores de miles

        if(numero.indexOf(",")>=0)

            resultado+=numero.substring(numero.indexOf(","));

 

        if(numero[0]=="-")

        {

            // Devolvemos el valor añadiendo al inicio el signo negativo

            return "-"+resultado;

        }else{

            return resultado;

        }

    }

function capitalize(s){
    return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};

