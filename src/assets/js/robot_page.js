$(document).ready(function () {    
       
    function modal_alert_message(text_message){
        $('#modal_alert_message').modal('show');
        $('#message_text').text(text_message);        
    }
    
    $("#accept_modal_alert_message").click(function () {
        $('#modal_alert_message').modal('hide');
    });
    
    //------------desenvolvido para DUMBU-LEADS-------------------    
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
    
            $("#idbtnapply").click(function(){                
        //var login=document.getElementById('idinprobprofile_'+id.toString());
        var login=$('#idinprobprofile').val();
        //var pass=document.getElementById('idinprobpass_'+id.toString());
        var pass=$('#idinprobpass').val();
        var profile_theme=$('#idinprobtheme').val();
        var recuperation_email_account=$('#idinprobaccountemail').val();
        var status_id=$('#idselestatus').val();
        var init=toTimestamp($('#idselinit').val().toString()+' 00:00:00');
        var end=toTimestamp($('#idselend').val().toString()+' 00:00:00');
        var creator_email=$('#idinprobcreatoremail').val();
        //var recuperation_phone=$('#idinprobaccountelf').val();
        $.ajax({
            url: base_url + 'index.php/admin/insert_robot',
            data:  {
                'login':login,
                'pass':pass,
                'profile_theme':profile_theme,
                'recuperation_email_account':recuperation_email_account,
                'status_id':status_id,
                'init':init,
                'end':end,
                'creator_email':creator_email//,
                //'recuperation_phone':recuperation_phone
            },   
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                /*if (response['success']) {                                
                   $(location).attr('href',base_url+'index.php/admin/robot'+response['resource']);
                } else {
                      modal_alert_message(response['message']);
                }*/
                modal_alert_message(response['message']);
            },
            error: function (xhr, status) {
                modal_alert_message(T('Não foi possível executar sua solicitude!',language));                
            }
        });                          
    });

        $(document).on('click', '.robotok', function(){                
        var id_element = $(this).attr('id');
        var res = id_element.split("_");
        var id = res[res.length-1];
        //var login=document.getElementById('idinprobprofile_'+id.toString());
        var login=$('#idinprobprofile_'+id.toString()).val();
        //var pass=document.getElementById('idinprobpass_'+id.toString());
        var pass=$('#idinprobpass_'+id.toString()).val();
        var profile_theme=$('#idinprobtheme_'+id.toString()).val();
        var recuperation_email_account=$('#idinprobaccountemail_'+id.toString()).val();
        var status_id=$('#idselestatus_'+id.toString()).val();
        var init=toTimestamp($('#idselinit_'+id.toString()).val().toString()+' 00:00:00');
        var end=toTimestamp($('#idselend_'+id.toString()).val().toString()+' 00:00:00');
        var creator_email=$('#idinprobcreatoremail_'+id.toString()).val();
        //var recuperation_phone=$('#idinprobaccountelf_'+id.toString()).val();
        $.ajax({
            url: base_url + 'index.php/admin/update_robot',
            data:  {
                'id': id,
                'login':login,
                'pass':pass,
                'profile_theme':profile_theme,
                'recuperation_email_account':recuperation_email_account,
                'status_id':status_id,
                'init':init,
                'end':end,
                'creator_email':creator_email//,
                //'recuperation_phone':recuperation_phone
            },   
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                /*if (response['success']) {                                
                   $(location).attr('href',base_url+'index.php/admin/robot'+response['resource']);
                } else {
                      modal_alert_message(response['message']);
                }*/
                modal_alert_message(response['message']);
            },
            error: function (xhr, status) {
                modal_alert_message(T('Não foi possível executar sua solicitude!',language));                
            }
        });                          
    });

    $('#login_container2').keypress(function (e) {
        if (e.which == 13) {
            $("#do_show_robots").click();
            return false;
        }
    });
    
    $(document).on('click', '.robotcancel', function(){                
        var id_element = $(this).attr('id');
        var res = id_element.split("_");
        var id = res[res.length-1];
        //var recuperation_phone=$('#idinprobaccountelf_'+id.toString()).val();
        $.ajax({
            url: base_url + 'index.php/admin/get_robot_by_id',
            data:  {
                'id': id,
            },   
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response['success']) {                                
                  //$(location).attr('href',base_url+'index.php/admin/robot'+response['resource']);
                  var robots = response['robots_array'];
                  //var login=$('#idinprobprofile_'+id.toString()).val();
                  document.getElementById('idinprobprofile_'+id.toString()).value=robots[0]['login'].toString();
                  //var pass=$('#idinprobpass_'+id.toString()).val();
                  document.getElementById('idinprobpass_'+id.toString()).value=robots[0]['pass'].toString();
                  //var profile_theme=$('#idinprobtheme_'+id.toString()).val();
                  document.getElementById('idinprobtheme_'+id.toString()).value=robots[0]['profile_theme'].toString();
                  //var recuperation_email_account=$('#idinprobaccountemail_'+id.toString()).val();
                  document.getElementById('idinprobaccountemail_'+id.toString()).value=robots[0]['recuperaton_email_account'];
                  //var status_id=$('#idselestatus_'+id.toString()).val();
                  document.getElementById('idselestatus_'+id.toString()).value=robots[0]['status_id'];
                  //var init=toTimestamp($('#idselinit_'+id.toString()).val().toString()+' 00:00:00');
                                    var datemp=toDate(robots[0]['init']);
                                    var atrib=datemp.split('/',4);
                                    var a=atrib[2];
                                    var m=atrib[1];
                                    var d=atrib[0];
                                    var html=a+'-'+m+'-'+d;
                                    //$('#idselinit_'+id.toString()).datepicker();
                                    //var a1=toInt(a);
                                    //var datemp1=new Date(datemp.getFullYear(),datemp.getMonth(),datemp.getDate());
                                    //$('#idselinit_'+id.toString()).datepicker('setDate', toDate(robots[0]['init']));
                                    //$('#idselinit_'+id.toString()).attr('value', new Date(robots[0]['init']));
                                    //document.getElementById('#idselinit_'+id.toString()).innerHTML=html;
                                    //$datepick.datepicker('setDate', html);
                                    //document.getElementById('#idselinit_'+id.toString()).value=html;
                  //var end=toTimestamp($('#idselend_'+id.toString()).val().toString()+' 00:00:00');
                  //var creator_email=$('#idinprobcreatoremail_'+id.toString()).val();
                                    datemp=toDate(robots[0]['end']);
                                    atrib=datemp.split('/',4);
                                    a=atrib[2];
                                    m=atrib[1];
                                    d=atrib[0];
                                    html=a+'-'+m+'-'+d;
                                    $datepick = $('idselend_'+id.toString());
                                    $datepick.datepicker();
                                    $datepick.datepicker('setDate', datemp);
                                    //$datepick.datepicker('setDate', html);
                  //document.getElementById('#idselend_'+id.toString()).value=html;
                  document.getElementById('idinprobcreatoremail_'+id.toString()).value=robots[0]['creator_email'];
                                   //var datemp=toDate(robots[i]['end']);
                } else {
                      modal_alert_message(response['message']);
                }
            },
            error: function (xhr, status) {
                modal_alert_message(T('Não foi possível executar sua solicitude!',language));                
            }
        //var login=document.getElementById('idinprobprofile_'+id.toString());
        //var pass=document.getElementById('idinprobpass_'+id.toString());
        
        });                          
    });

    
    $("#do_show_robots").click(function () { 
    var status_id = $('#status_select').val();
    var date_from = $('#status_date_from').val();
    var date_to=$('#status_date_to').val();
        $.ajax({
            url: base_url + 'index.php/admin/show_robots', 
            data:  {
                        'status_id': status_id,
                        'date_from': date_from,
                        'date_to': date_to,
                        'language': language                                
                    }, 
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response['success']) { 
                    var robots = response['robots_array'];
                    var i, num_robots = robots.length;
                    var html = "";
                    var options_trd=response['options'];
//                    for(i = 0; i < num_robots; i++){
//                        html += '<div id="user_'+robots[i]['id']+'" >';
//                            html += '<b>login: </b>' + robots[i]['login']+'<br>';
//                            html += '<b>status: </b>' + robots[i]['status_id']+'<br>';
//                            html += '<b>data: </b>' + toDate(robots[i]['init']) + '<br><br>';
//                            html += '<b>email: </b>' + robots[i]['end']+'<br>'
//                            html += '---------------------------------- <br>';
//
//                                                html += '</div>';
//                    }
            //html+='<div class="row">';
            //html+='<div class="col-md-2">';
            html+='<div id="robot_form" class="row">';
            html+='<div class="row">';
            html+='<div class="col-xs-10" style="margin-left: 100px;">';
            html+='<table class="table">';
            html+='<tr class="list-group-item-success">';
            html+='<td style="width:100%; padding:5px"><b>Resultados da filtragem</b></td>';
            html+='</tr>';
            html+='</table>';
            html+='</div>';
            html+='</div>';
            html+=    '<div class="col-md-1"></div>';
            html+=    '<div class="col-md-2">';

            html+='<br><p><b style="color:red">Total de registros: </b><b>'+num_robots+'</b></p><br>';
            html+='</div>';
            html+='</div>';
            html+='<div class="row">';
            html+='<div class="col-xs-10" style="margin-left: 100px;">';
            html+='<table class="table">';
            html+='<tr class="list-group-item-success">';
            html+='<td style="width:5%; padding:5px"><b>No.</b></td>';
            html+='<td style="width:30%; padding:5px"><b>Dados gerais</b></td>';
            html+='<td style="width:25%; padding:5px"><b>Estado atual</b></td>';
            html+='<td style="width:30%; padding:5px"><b>Dados de contato</b></td>';
            html+='<td style="width:10%; padding:5px"><b>Operações</b></td>';
            html+='</tr>';
            html+='</table>';
            html+='</div>';
            html+='</div>';
            var sel='</select>';
            html+='<div id="tablarobots">';//class="row"
            html+='<div class="col-xs-10" style="margin-left: 100px;">';
            html+='<table class="table">';
                 
                    for(var i = 0; i < num_robots; i++){
                        //html+=''
                            html+= '<tr class="list-group-item-success" id="row-client_'+robots[i]['id']+'" style="visibility: visible;display: block'; 
                            var jot=i % 2;
                            if (jot == 1) 
                            {html+='; background-color: #dff0d8';}
                            else
                            {html+='; background-color: white';}
                            html+= '">';
                                html+= '<td style="text-align:left; width:5%; padding:5px">';
                                    var k=i+1;
                                    var segme='<b>'+k;
                                    html+= segme; html+='</b>';
                                    html+='</td>';                                
                                    html+= '<td style="text-align:left; width:30%; padding:5px">';
                                    html+='<b>Dumbu ID: </b>'+robots[i]['id']+'<br>';
                                    html+='<b>DS ID:</b>'+robots[i]['ds_user_id']+'<br><br>';
                                    //html+='<b>Dumbu ID: </b><input type="text" name="naminprobdumbuid_'+robots[i]['id'];
                                    //html+='" id= "idinprobdumbuid_'+robots[i]['id'];
                                    //html+='" value="'+robots[i]['id']+'"><br><br>';
                                    //html+='<b>Profile: </b>'+robots[i]['login']+'<br>';
                                    html+='<b>Profile: </b><input type="text" name="naminprobprofile_'+robots[i]['id'];
                                    html+='" id= "idinprobprofile_'+robots[i]['id'];
                                    html+='" value="'+robots[i]['login']+'"><br><br>';
                             
                                    //html+='<b>Password: </b>'+robots[i]['pass']+'<br>';
                                    html+='<b>Password: </b><input type="text" name="naminprobpass_'+robots[i]['id'];
                                    html+='" id= "idinprobpass_'+robots[i]['id'];
                                    html+='" value="'+robots[i]['pass']+'"><br><br>';
                                    
                                    //html+='<b>DS ID: </b><input type="text" name="naminprobdsid_'+robots[i]['id'];
                                    //html+='" id= "idinprobdsid_'+robots[i]['id'];
                                    //html+='" value="'+robots[i]['ds_user_id']+'"><br><br>';
                             
                                    //html+='<b>Profile: </b>'+robots[i]['login']+'<br>';
                                    html+='<b>Tema: </b><input type="text" name="naminprobtheme_'+robots[i]['id'];
                                    html+='" id= "idinprobtheme_'+robots[i]['id'];
                                    html+='" value="'+robots[i]['profile_theme']+'"><br><br>';
                             
                                    //html+='<b>Password: </b>'+robots[i]['pass']+'<br>';
                             
                                    
                                    //html+='<input id="idseldsid_'+robots[i]['id']+'" name="nameseledsid_'+robots[i]['id'];
                                    //html+='" type="date" class="robot_atribute" value="';
                                    //html+=toDate(robots[i]['ds_user_id'])+'">';
                                    //html+='</input>';
                                    html+='</td>';
                                    //echo '<b>Email: </b>'.$result[$i]['email'].'<br>';
                                    //if ($SERVER_NAME == "ONE")
                                    //    echo '<b>Idioma: </b>'.$result[$i]['language'].'<br><br>';
                                    //else echo '<br>';
                                    //echo '<b>Status: </b><b id="label_status_'.$result[$i]['user_id'].'" style="color:red">'.get_name_status($result[$i]['status_id']).'</b><br>';
                                    html+= '<td style="width:25%; padding:5px">';
                                    var nid=robots[i]['status_id'];
                                    html+='<b>Status: </b><br>';
                                    html+='<select class="robot_atribute" id="idselestatus_'+robots[i]['id'];
                                    html+='" name="nameselestatus_'+robots[i]['id']+'" value="'+robots[i]['status_id'];
                                    html+='">';
                                    var html1='';
                                    html1=options_trd;
                                    html1=html1.replace('"'+robots[i]['status_id']+'"','"'+robots[i]['status_id']+'" selected');
                                    html+=html1;
                                    html+='</select>';
                                    html+='<br>';
                                    html+='<br>';
                                    html+='<b>Data de inicio: </b><br>';
                                    html+='<input id="idselinit_'+robots[i]['id']+'" name="nameseleinit_'+robots[i]['id'];
                                    html+='" type="date" class="robot_atribute" value="';
                                    //html+=toDate(robots[i]['init'])+'">';
                                    var datemp=toDate(robots[i]['init']);
                                    var atrib=datemp.split('/',4);
                                    var a=atrib[2];
                                    var m=atrib[1];
                                    var d=atrib[0];
                                    html+=a+'-'+m+'-'+d+'">';
                                    html+='</input>';
                                    html+='<br>';
                                    html+='<br>';
                                    html+='<b>Data final: </b><br>';
                                    html+='<input id="idselend_'+robots[i]['id']+'" name="nameselend_'+robots[i]['id'];
                                    html+='" type="date" class="robot_atribute" value="';
                                    //var datemp=toDate(robots[i]['end']);
                                    datemp=toDate(robots[i]['end']);
                                    atrib=datemp.split('/',4);
                                    a=atrib[2];
                                    m=atrib[1];
                                    d=atrib[0];
                                    html+=a+'-'+m+'-'+d+'">';
                                    //html+=datemp+'">';
                                    html+='</input>';
                                    html+='</td>';
                                    html+= '<td style="width:30%; padding:5px">';
                                    html+='<b>Recobrar senha usando email: </b><br><input type="text" name="naminprobpassemail_'+robots[i]['id'];
                                    html+='" id= "idinprobpassemail_'+robots[i]['id'];
                                    html+='" value="'+robots[i]['recuperation_email_pass']+'"><br><br>';
                                    
                                    //html+='<b>Profile: </b>'+robots[i]['login']+'<br>';
                                    html+='<b>Email de creação da conta: </b><br><input type="text" name="naminprobcreatoremail_'+robots[i]['id'];
                                    html+='" id= "idinprobcreatoremail_'+robots[i]['id'];
                                    html+='" value="'+robots[i]['creator_email']+'"><br><br>';
                             
                                    html+='<b>Recobrar conta usando email: </b><br><input type="text" name="naminprobaccountemail_'+robots[i]['id'];
                                    html+='" id= "idinprobaccountemail_'+robots[i]['id'];
                                    html+='" value="'+robots[i]['recuperation_email_account']+'"><br><br>';
                                    //html+='<b>Password: </b>'+robots[i]['pass']+'<br>';
                                    //html+='<b>Recobrar conta usando telefone: </b><br><input type="text" name="naminprobaccountelf_'+robots[i]['id'];
                                    //html+='" id= "idinprobaccountelf_'+robots[i]['id'];
                                    //html+='" value="'+robots[i]['recuperation_phone']+'"><br><br>';
                                    html+='</td>';
                                    html+= '<td style="width:10%; padding:5px">';
                                    html+='<button  style="min-width:150px" id = "idbtnapply_'+robots[i]['id']+'" name="namebtnapply_'+robots[i]['id'];
                                    html+='" type="button" class="robotok"  data-spinner-color="#ffffff">';//data-style="expand-left" 
                                    //html+='<span class="ladda-label">Ok</span>';
                                    html+='Salvar</button>';
                                    html+='<br>';
                                    html+='<br>';
                                    html+='<button  style="min-width:150px" id = "idbtnapply_'+robots[i]['id']+'" disabled="disabled" name="namebtnapply_'+robots[i]['id'];
                                    html+='" type="button" class="robotcancel"  data-spinner-color="#ffffff">';//data-style="expand-left" 
                                    //btn btn-success ladda-button
                                    //html+='<span class="ladda-label">Cancel</span>';
                                    html+='Cancelar</button>';
                                    html+='</td>';
                               
                                   
                                    html+='</tr>';

                                    //html+='<br>';
                                  
                        
                        
                    }
                    html+='</table>';
                    html+='</div>';
                    html+='</div>';
                    document.getElementById("container_robots").innerHTML = html;
                    //modal_alert_message("Existen "+num_users+" usuarios a mostrar");
                } else {
                    document.getElementById("container_robots").innerHTML = "";  
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

function capitalize(s){
    return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};

