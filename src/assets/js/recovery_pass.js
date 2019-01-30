$(document).ready(function () {    
       
    function modal_alert_message(text_message){
        $('#modal_alert_message').modal('show');
        $('#message_text').text(text_message);        
    }
    
    $("#accept_modal_alert_message").click(function () {
        $('#modal_alert_message').modal('hide');
    });
    
    //------------desenvolvido para DUMBU-LEADS-------------------  
    
    $('#email_recovery').keypress(function (e) {
        if (e.which == 13) {
            $("#do_recovery").click();
            return false;
        }
    });
    
    $('#pass2').keypress(function (e) {
        if (e.which == 13) {
            $("#do_over_write_pass").click();
            return false;
        }
    });
    
    $("#do_recovery").click(function () {  
        var login = $('#user_recovery').val();        
        var email = $('#email_recovery').val();       
        
        if(email.trim() !== ''){
            if (validate_element('#email_recovery', "^[a-zA-Z0-9\._-]+@([a-zA-Z0-9-]{2,}[.])*[a-zA-Z]{2,4}$")) {
                if (login.trim() === '' || validate_element('#user_recovery', '^[a-zA-Z][\._a-zA-Z0-9]{0,99}$')) {
                    $('#user_recovery').css("border", "1px solid gray");
                    var l = Ladda.create(this);  l.start();
                    $.ajax({
                        url: base_url + 'index.php/welcome/recover_pass',            
                        data:{
                            login:login,
                            email:email,
                            language:language
                        },
                        type: 'POST',
                        dataType: 'json',
                        success: function (response) {
                            if (response['success']) {  
                                $('#container_recovery_message').text(T('Um email foi enviado a seu email para recuperar sua senha',language));
                                $('#container_recovery_message').css('visibility', 'visible');
                                $('#container_recovery_message').css('color', 'green');
                            } else {
                                $('#container_recovery_message').text(response['message']);
                                $('#container_recovery_message').css('visibility', 'visible');
                                $('#container_recovery_message').css('color', 'red');                           
                            }
                            l.stop();
                        },
                        error: function (xhr, status) {
                            $('#container_recovery_message').text(T('Não foi possível executar sua solicitude!',language));
                            $('#container_recovery_message').css('visibility', 'visible');
                            $('#container_recovery_message').css('color', 'red');
                            l.stop();
                        }
                    });                
                } else {
                    message_container(T('O nome de um perfil só pode conter combinações de letras, números, sublinhados e pontos!',language),'#container_recovery_message','red');                                            
                }
            } else {
                message_container(T('Problemas na estrutura do email informado!',language),'#container_recovery_message','red');                                                            
            }
        }
        else{
            //modal_alert_message(T('Deve fornecer o email!',language));
            $('#container_recovery_message').text(T('Deve fornecer o email!',language));
            $('#container_recovery_message').css('visibility', 'visible');
            $('#container_recovery_message').css('color', 'red');            
        }
            
    });
    
    $("#do_over_write_pass").click(function () {  
        var pass1 = $('#pass1').val();        
        var pass2 = $('#pass2').val();       
        
        if(pass1.trim() !== ''){
            if( pass1 === pass2 ){
                var l = Ladda.create(this);  l.start();
                $.ajax({
                    url: base_url + 'index.php/welcome/over_write_pass',            
                    data:{
                        new_pass:pass1,
                        token:token,
                        login:login,
                        language:language
                    },
                    type: 'POST',
                    dataType: 'json',
                    success: function (response) {
                        if (response['success']) {  
                            $('#container_recovery_message').text(T('Sua senha foi modificada com sucesso! Entre com as novas credenciais',language));
                            $('#container_recovery_message').css('visibility', 'visible');
                            $('#container_recovery_message').css('color', 'green');
                        } else {
                            $('#container_recovery_message').text(response['message']);
                            $('#container_recovery_message').css('visibility', 'visible');
                            $('#container_recovery_message').css('color', 'red');                           
                        }
                        l.stop();
                    },
                    error: function (xhr, status) {
                        $('#container_recovery_message').text(T('Não foi possível executar sua solicitude!',language));
                        $('#container_recovery_message').css('visibility', 'visible');
                        $('#container_recovery_message').css('color', 'red');
                        l.stop();
                    }
                });
            }
            else{
                $('#container_recovery_message').text(T('Deve repetir a nova senha!',language));
                $('#container_recovery_message').css('visibility', 'visible');
                $('#container_recovery_message').css('color', 'red');            
            }
        }
        else{
            //modal_alert_message(T('Deve fornecer o email!',language));
            $('#container_recovery_message').text(T('Deve fornecer o novo password!',language));
            $('#container_recovery_message').css('visibility', 'visible');
            $('#container_recovery_message').css('color', 'red');            
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

function capitalize(s){
    return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};

