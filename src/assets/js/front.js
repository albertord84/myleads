$(document).ready(function () {
    //$('body').on('propertychange input', 'input[class="number"]', forceNumeric);
    
    $('#main_dropdown').on("click.bs.dropdown", function (e) {
        e.stopPropagation(); 
        e.preventDefault();        
    });
    
    $(document).ajaxStart(function() {            
         $('body').addClass('wait');
    }).ajaxStop(function() {                   
        $('body').removeClass('wait');
    });

    $(document).on('click', '.menu_login', function(){        
        document.getElementById("userLogin2").focus();
    });
        
    $('#pass_registration').keypress(function (e) {
        if (e.which == 13) {
            $("#do_signin").click();
            return false;
        }
    });
    
    $('#number_confirmation').keypress(function (e) {
        if (e.which == 13) {
            $("#do_signin_number").click();
            return false;
        }
    });
    
    $('#login_container1').keypress(function (e) {
        if (e.which == 13) {
            $("#btn_dumbu_login1").click();
            return false;
        }
    });
    
    $('#login_container2').keypress(function (e) {
        if (e.which == 13) {
            $("#btn_dumbu_login2").click();
            return false;
        }
    });
    
    function getUrlVars(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
    
    function modal_alert_message(text_message){
        $('#modal_alert_message').modal('show');
        $('#message_text').text(text_message);        
    }
    
    $("#accept_modal_alert_message").click(function () {
        $('#modal_alert_message').modal('hide');
    });
    
    //------------desenvolvido para DUMBU-LEADS-------------------
    
    $("#recupery_pass").click(function () {       
        $(location).attr('href',base_url+'index.php/welcome/password_recovery?language='+language);                                        
    });
    
    $("#lnk_language2").click(function () {
       var new_language = $("#txt_language2").text();
       $('#lnk_faq').attr("href",base_url+"index.php/welcome/faqget?language="+new_language)
        $.ajax({
            url: base_url + 'index.php/welcome/update_language',
            data: {                                
                'new_language': new_language
            },
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (!response['success']) {                    
                    modal_alert_message(response['message']);
                }          
                else{
                    $(location).attr("href",base_url+"index.php?language="+$("#txt_language2").text());        
                }
            },
            error: function (xhr, status) {
                //message_container('Não foi possível responder a sua solicitude!',fieldErrorMessage,'red');                                           
            }
        });                        
    });
    
    $("#lnk_language3").click(function () {
       var new_language = $("#txt_language3").text();
       $('#lnk_faq').attr("href",base_url+"index.php/welcome/faq?language="+new_language)
        $.ajax({
            url: base_url + 'index.php/welcome/update_language',
            data: {                                
                'new_language': new_language
            },
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (!response['success']) {                    
                    modal_alert_message(response['message']);
                }          
                else{
                    $(location).attr("href",base_url+"index.php?language="+$("#txt_language3").text());        
                }
            },
            error: function (xhr, status) {
                //message_container('Não foi possível responder a sua solicitude!',fieldErrorMessage,'red');                                           
            }
        });
    });
    
        $("#lnk_language2_cell").click(function () {
       var new_language = $("#txt_language2").text();
       $('#lnk_faq').attr("href",base_url+"index.php/welcome/faq?language="+new_language)
        $.ajax({
            url: base_url + 'index.php/welcome/update_language',
            data: {                                
                'new_language': new_language
            },
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (!response['success']) {                    
                    modal_alert_message(response['message']);
                }          
                else{
                    $(location).attr("href",base_url+"index.php?language="+$("#txt_language2").text());        
                }
            },
            error: function (xhr, status) {
                //message_container('Não foi possível responder a sua solicitude!',fieldErrorMessage,'red');                                           
            }
        });
    });
    
        $("#lnk_language3_cell").click(function () {
       var new_language = $("#txt_language3").text();
       $('#lnk_faq').attr("href",base_url+"index.php/welcome/faq?language="+new_language)
        $.ajax({
            url: base_url + 'index.php/welcome/update_language',
            data: {                                
                'new_language': new_language
            },
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (!response['success']) {                    
                    modal_alert_message(response['message']);
                }          
                else{
                    $(location).attr("href",base_url+"index.php?language="+$("#txt_language3").text());        
                }
            },
            error: function (xhr, status) {
                //message_container('Não foi possível responder a sua solicitude!',fieldErrorMessage,'red');                                           
            }
        });
    });
    
    
    $("#btn_dumbu_login1").click(function() {
        do_login('#userLogin1','#userPassword1', '#container_login_message1', 
                 '#container_login_force_login1', '#check_force_login1', '#message_force_login1',this);
    });
    
    $("#btn_dumbu_login2").click(function() {                
        do_login('#userLogin2','#userPassword2', '#container_login_message2', 
                 '#container_login_force_login2', '#check_force_login2', '#message_force_login2',this);        
    });    
   
   function do_login(fieldLogin,fieldPass, fieldErrorMessage, fieldContainerLoginForce, fieldCheckForceLogin, fieldMessageForceLogin, object){                        
       if($(fieldLogin).val()!='' && $(fieldPass).val()!==''){           
            if (validate_element(fieldLogin, '^[a-zA-Z][\._a-zA-Z0-9]{0,99}$') || validate_element(fieldLogin, "^[a-zA-Z0-9\._-]+@([a-zA-Z0-9-]{2,}[.])*[a-zA-Z]{2,4}$")) {                
                message_container(T('Espere por favor ...',language),fieldErrorMessage,'green');                                                                                
                var l = Ladda.create(object);  l.start();
                $.ajax({
                    url: base_url + 'index.php/welcome/login',
                    data: {                                
                        'client_login': $(fieldLogin).val(),
                        'client_pass': $(fieldPass).val(),
                        'language': language
                    },
                    type: 'POST',
                    dataType: 'json',
                    success: function (response) {
                        if (response['success']) {                    
                            if(response['resource'] == 'client')
                                gtag_report_conversion(base_url+'index.php/welcome/client');
                            else
                                $(location).attr('href',base_url+'index.php/welcome/'+response['resource']);
                        } else { 
                            message_container(response['message'],fieldErrorMessage,'red');                                
                        }
                        l.stop();
                    },
                    error: function (xhr, status) {
                        message_container(T('Não foi possível responder a sua solicitude!',language),fieldErrorMessage,'red');                        
                        l.stop();
                    }
                });                
            }
            else {                
                message_container(T('O nome de um perfil só pode conter combinações de letras, números, sublinhados e pontos!',language),fieldErrorMessage,'red');                
            }
        } else {            
            message_container(T('Deve preencher todos os dados corretamente!',language),fieldErrorMessage,'red');                            
        }         
    }
   
    $("#do_signin").click(function () {       
       var login = $('#user_registration').val();
       var pass = $('#pass_registration').val();
       var email = $('#email_registration').val()       
       var telf = $('#telf_registration').val()       
       var promotional_code = $('#promotional_code').val()       
       var UTM = typeof getUrlVars()["utm_source"] !== 'undefined' ? getUrlVars()["utm_source"] : '';
       
       if (login != '' && pass != '' && email != '') {
            if (validate_element('#email_registration', "^[a-zA-Z0-9\._-]+@([a-zA-Z0-9-]{2,}[.])*[a-zA-Z]{2,4}$")) {
                if (validate_element('#user_registration', '^[a-zA-Z][\._a-zA-Z0-9]{0,99}$')) {
                    if (validate_element('#telf_registration', '^[0-9]{0,15}$')) {
                        if($('#terms_checkbox').is(":checked")) {                        
                            var l = Ladda.create(this);  l.start();
                            $.ajax({
                                url: base_url + 'index.php/welcome/signin',
                                data: {
                                    'client_email': email,
                                    'client_telf': telf,
                                    'client_name': name,
                                    'client_login': login,
                                    'client_pass': pass,
                                    'promotional_code': promotional_code,
                                    'language': language,
                                    'utm_source': UTM
                                },
                                type: 'POST',
                                dataType: 'json',
                                success: function (response) {
                                    if (response['success']) {
                                        //campo para recivir codigo de 4 digitos
                                        message_container(T('Para continuar o cadastro use o número enviado a seu e-mail!',language),'#container_sigin_message','green');                                                  
                                        document.getElementById("datas_form").style.display = 'none';                                        
                                        document.getElementById("show_number").style.display = 'block';                                        
                                        document.getElementById("email_place").innerHTML = email;                                        
                                        document.getElementById("button_place").innerHTML = "";                                        
                                    } else {
                                        message_container(response['message'],'#container_sigin_message','red');                                                  
                                    }                
                                    l.stop();
                                },
                                error: function (xhr, status) {
                                    message_container(T('Não foi possível responder a sua solicitude!',language),'#container_sigin_message','red');                                                                                  
                                    l.stop();
                                }
                            });                         
                        }else{
                            message_container(T('Deve aceitar os termos de uso!',language),'#container_sigin_message','red');                        
                            $('#terms_checkbox').css('outline-color', 'red');
                            $('#terms_checkbox').css('outline-style', 'solid');
                            $('#terms_checkbox').css('outline-width', 'thin');                        
                        }
                    }
                    else{
                        message_container(T('O telefone só pode conter números!',language),'#container_sigin_message','red');                                            
                    }
                } else {
                    message_container(T('O nome de um perfil só pode conter combinações de letras, números, sublinhados e pontos!',language),'#container_sigin_message','red');                                            
                }
            } else {
                message_container(T('Problemas na estrutura do email informado!',language),'#container_sigin_message','red');                                                            
            }
        } else {
            message_container(T('Deve preencher todos os dados corretamente!',language),'#container_sigin_message','red');              
        }
       
    });
    
    $("#do_signin_number").click(function () {       
       var login = $('#user_registration').val();
       var pass = $('#pass_registration').val();
       var email = $('#email_registration').val()       
       var telf = $('#telf_registration').val()       
       var UTM = typeof getUrlVars()["utm_source"] !== 'undefined' ? getUrlVars()["utm_source"] : '';
       
       if (login != '' && pass != '' && email != '') {
            if (validate_element('#email_registration', "^[a-zA-Z0-9\._-]+@([a-zA-Z0-9-]{2,}[.])*[a-zA-Z]{2,4}$")) {
                if (validate_element('#user_registration', '^[a-zA-Z][\._a-zA-Z0-9]{0,99}$')) {
                    if (validate_element('#telf_registration', '^[0-9]{0,15}$')) {
                        if (validate_element('#number_confirmation', '^[0-9]{4,4}$')) {
                        
                            if($('#terms_checkbox').is(":checked")) {                        
                                var l = Ladda.create(this);  l.start();
                                $.ajax({
                                    url: base_url + 'index.php/welcome/signin_number',
                                    data: {
                                        'client_email': email,
                                        'client_telf': telf,
                                        'client_name': name,
                                        'client_login': login,
                                        'client_pass': pass,
                                        'language': language,
                                        'utm_source': UTM,
                                        'number_confirmation':$(number_confirmation).val()
                                    },
                                    type: 'POST',
                                    dataType: 'json',
                                    success: function (response) {
                                        if (response['success']) {
                                            $(location).attr('href',base_url+'index.php/welcome/'+response['resource']+'');

                                        } else {
                                            message_container(response['message'],'#container_sigin_message','red');                                                  
                                        }                
                                        l.stop();
                                    },
                                    error: function (xhr, status) {
                                        message_container(T('Não foi possível responder a sua solicitude!',language),'#container_sigin_message','red');                                                                                  
                                        l.stop();
                                    }
                                });                         
                            }else{
                                message_container(T('Deve aceitar os termos de uso!',language),'#container_sigin_message','red');                        
                                $('#terms_checkbox').css('outline-color', 'red');
                                $('#terms_checkbox').css('outline-style', 'solid');
                                $('#terms_checkbox').css('outline-width', 'thin');                        
                            }
                        }
                        else{
                            message_container(T('Deve ser um código de 4 números!',language),'#container_sigin_message','red');                                            
                        }                  }
                    else{
                        message_container(T('O telefone só pode conter números!',language),'#container_sigin_message','red');                                            
                    }
                } else {
                    message_container(T('O nome de um perfil só pode conter combinações de letras, números, sublinhados e pontos!',language),'#container_sigin_message','red');                                            
                }
            } else {
                message_container(T('Problemas na estrutura do email informado!',language),'#container_sigin_message','red');                                                            
            }
        } else {
            message_container(T('Deve preencher todos os dados corretamente!',language),'#container_sigin_message','red');              
        }
       
    });
    
    $("#do_cancel_signin").click(function () {
        var language='PT';       
        $.ajax({
            url: base_url + 'index.php/welcome/signout',
            data: {                                
                'client_login': login,
                'client_pass': pass,
                'language': language
            },
            type: 'POST',
            dataType: 'json',
            beforeSend:function(){
                        return confirm("Are you sure to cancel the subscription?");
                     },
            success: function (response) {
                if (response['success']) {
                    modal_alert_message(response['message']);
                } else {
                      modal_alert_message(response['message']);
                }
            },
            error: function (xhr, status) {                
                message_container('Não foi possível executar sua solicitude!','#container_sigin_message','red');                                        
            }
        });                                 
    });
    
    function validate_element(element_selector, pattern) {
        if (!$(element_selector).val().match(pattern)) {
            $(element_selector).css("border", "1px solid red");
            return false;
        } else {
            $(element_selector).css("border", "1px solid gray");
            return true;
        }
    }    
    
    function message_container(message, container, color){
        $(container).text(message);                                            
        $(container).css('visibility','visible');
        $(container).css('color', color);
    }
    
}); 

function forceNumeric(){
    var $input = $(this);
    $input.val($input.val().replace(/[^\d]+/g,''));
}
