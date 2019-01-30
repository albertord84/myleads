<?php

require_once '../class/DB.php';
require_once '../class/Worker.php';
require_once '../class/system_config.php';
require_once '../class/Gmail.php';
require_once '../class/Payment.php';

$db = new leads\cls\DB();

echo date("Y-m-d h:i:sa") . "<br>\n";

ini_set('xdebug.var_display_max_depth', 7);
ini_set('xdebug.var_display_max_children', 256);
ini_set('xdebug.var_display_max_data', 1024);



//Worker
$Worker = new leads\cls\Worker();
$robot_profile = new leads\cls\Robot_Profile();
$robot_id = 11;
$db->update_field_in_DB('robots_profiles', 'id', $robot_id, 'status_id', '1');
$robot_profile->get_robot_profile_from_backup($robot_id);

$PR = 33;
$Worker->next_work = $Worker->DB->get_work_by_id($PR);
$Worker->Robot->next_work = $Worker->next_work;
$result = $Worker->Robot->do_robot_extract_leads($robot_profile->ig, $robot_profile->cookies, $robot_profile->proxy, $Worker->config->MULTI_LEVEL);

var_dump($result);



//$db->set_id_in_profile();
//$db->copy_all_leads();
//$db->show_all_leads();
//$db->codify_base64_all_leads();
//$seed = "mi chicho lindo";
//$key_number = md5($seed);
//$a = openssl_encrypt ('jose ramon gonzalez 86010824666', "aes-256-ctr", $key_number);
//$b = openssl_decrypt ($a, "aes-256-ctr", $key_number);
//echo $b;
//-------------------------------------------------------------------------
//require_once '../class/Utils.php';
//$utils = new \leads\cls\Utils();
//echo $utils->extractEmail("perro cagando josergm86gmail.com");
//-------------------------------------------------------------------------
//require_once '../class/Worker.php';
//$Worker = new leads\cls\Worker();
//$Worker->truncate_daily_work();
?>