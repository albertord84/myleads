$(document).ready(function () {    
    $('#datetimepicker_lead').datepicker( { format: "dd/mm/yyyy", autoclose: true});
    $('#datetimepicker_lead2').datepicker( { format: "dd/mm/yyyy", autoclose: true});
    $('#datetimepicker').datepicker( { format: "dd/mm/yyyy", autoclose: true});
    $('#datetimepicker2').datepicker( { format: "dd/mm/yyyy", autoclose: true});
    
    //gtag_report_conversion('https://dumbu.pro/leads/src/index.php/welcome/client');
    
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
            url: base_url + 'index.php/welcome/logout',            
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
    
    $("#do_add_profile_temp").click(function () {
        var profile_temp = $('#profile_temp').val();
        var profile_insta_temp = $('#profile_insta_temp').val();
        var profile_type_temp = $('#profile_type_temp').val();

        if(profile_type_temp == 0)
            profile_type_temp = $('#campaing_type').val();
        var char_type;
        if(profile_type_temp == 1)
            char_type = '';
        if(profile_type_temp == 2)
            char_type = '@';
        if(profile_type_temp == 3)
            char_type = '#';
        $("#table_search_profile").empty();

        if(validate_element($('#profile_insta_temp'), '^[0-9]{1,100}$') && profile_insta_temp > 0){
            if (validate_element($('#profile_temp'), '^[\._\u00c0-\u01ffa-zA-Za-zA-Z0-9\-]{1,100}$')) {                                                          
                $.ajax({
                         url: base_url + 'index.php/welcome/add_temp_profile',
                         data:  {                        
                             'profile_temp': profile_temp,
                             'profile_type_temp': profile_type_temp,
                             'profile_insta_temp': profile_insta_temp                        
                         },   
                         type: 'POST',
                         dataType: 'json',
                         success: function (response) {
                             if (response['success']) {                            
                                 $('#profile_temp').val('');
                                 var html = '<li id = "_' + profile_insta_temp + '">';                                                          
                                     html +=     '<span class="fleft100 ellipse">';
                                     html +=           '<div class ="col-md-12 col-sm-12 col-xs-12" data-toggle="tooltip" data-placement="top" title="'+profile_temp+'">';
                                     html +=                char_type+reduced_profile(profile_temp);                                     
                                     html +=           '</div>';
                                     html +=           '<b class="my_close">x</b>';
                                     html +=      '</span>';
                                     html += '</li>';
                                 document.getElementById("profiles").innerHTML += html;
                                 $('#profile_type_temp').val(0);
                             } else {
                                   modal_alert_message(response['message']);
     //                                    $('#container_sigin_message').text(response['message']);
     //                                    $('#container_sigin_message').css('visibility', 'visible');
     //                                    $('#container_sigin_message').css('color', 'red');                                    
                             }                             
                         },
                         error: function (xhr, status) {
                             $('#container_sigin_message').text(T('Não foi possível executar sua solicitude!',language));
                             $('#container_sigin_message').css('visibility', 'visible');
                             $('#container_sigin_message').css('color', 'red');                             
                         }
                     });                             
                 } else {
                   modal_alert_message(T('O nome de um perfil só pode conter combinações de letras, números, sublinhados e pontos!',language));
     //            $('#container_sigin_message').text(T('Deve preencher todos os dados corretamente!'));
     //            $('#container_sigin_message').css('visibility', 'visible');
     //            $('#container_sigin_message').css('color', 'red');
                 //modal_alert_message('Formulario incompleto');
             }
        }
        else{
            modal_alert_message(T('Deve selecionar um perfil da lista fornecida',language));
        }
         
       
    });

    
    $(document).on('click', '.my_close', function(){        
        var profile_temp = this.parentNode.parentNode.id;        
        profile_temp = profile_temp.substr(1); //eliminado el _
        
        if (profile_temp) {            
            $.ajax({
                url: base_url + 'index.php/welcome/delete_temp_profile',
                data:  {                        
                    'profile_insta_temp': profile_temp
                },   
                type: 'POST',
                dataType: 'json',
                success: function (response) {
                    if (response['success']) {
                        $('#_'+profile_temp).remove();                        
                    } else {
                          modal_alert_message(response['message']);
//                                    $('#container_sigin_message').text(response['message']);
//                                    $('#container_sigin_message').css('visibility', 'visible');
//                                    $('#container_sigin_message').css('color', 'red');                                    
                    }
                },
                error: function (xhr, status) {
                    $('#container_sigin_message').text(T('Não foi possível executar sua solicitude!',language));
                    $('#container_sigin_message').css('visibility', 'visible');
                    $('#container_sigin_message').css('color', 'red');
                }
            });            
        } else {
              modal_alert_message(T('Deve fornecer um perfil para eliminar',language));
//            $('#container_sigin_message').text(T('Deve preencher todos os dados corretamente!'));
//            $('#container_sigin_message').css('visibility', 'visible');
//            $('#container_sigin_message').css('color', 'red');
            //modal_alert_message('Formulario incompleto');
        }
        
    });
    
    $("#do_save_campaing").click(function () {        
        var total_daily_value = $('#daily_value').val(); 
        total_daily_value = total_daily_value.replace(",", ""); 
        var available_daily_value = total_daily_value;
        var insta_id = "";
        
        var campaing_type_id = $('#campaing_type').val();
        var client_objetive = $('#objective').val();
        
       
        if(total_daily_value.trim() != '' && client_objetive != '') {
            if(parseFloat(total_daily_value) >= min_daily_value) {
                var l = Ladda.create(this);  l.start();
                $.ajax({
                    url: base_url + 'index.php/welcome/save_campaing',
                    data:  {
                        'total_daily_value': total_daily_value*100,
                        'available_daily_value': available_daily_value*100,
                        'insta_id':insta_id,
                        'campaing_type_id': campaing_type_id,
                        'client_objetive': client_objetive,                
                        'language': language                                
                    },   
                    type: 'POST',
                    dataType: 'json',
                    success: function (response) {
                        if (response['success']) {
                            $('#daily_value').val('0.00');                                    
                            clearBox("profiles");                                                                                                    
                            $('#criar').modal('hide');
                            var tempStr = document.getElementById("list_campaings").innerHTML;
                            document.getElementById("list_campaings").innerHTML = response['html'] + tempStr;
                            //modal_alert_message(response['message']);
                            message_created_campaing();
                            //modal_alert_message_CP("Operação realizada!", "Sua campanha foi criada exitosamente. Para pode comenzar a extraer leads deve ativar sua campanha. Deseja fazer agora?", "Cancelar", "Ok", remover_perfil, profile);
                            
                        } else {
                              modal_alert_message(response['message']);
//                                    $('#container_sigin_message').text(response['message']);
//                                    $('#container_sigin_message').css('visibility', 'visible');
//                                    $('#container_sigin_message').css('color', 'red');                                    
                        }
                        l.stop();    
                    },
                    error: function (xhr, status) {
                        $('#container_sigin_message').text(T('Não foi possível executar sua solicitude!',language));
                        $('#container_sigin_message').css('visibility', 'visible');
                        $('#container_sigin_message').css('color', 'red');
                        l.stop();
                    }
                });                
            } else {
                  modal_alert_message(T('O orçamento deve ser um valor monetário (não zero) com até dois valores decimais e a partir de',language)+' '+currency_symbol+' '+min_daily_value+'.00!');
                  //modal_alert_message('Deve ser um número (não zero) com até dois valores decimais!');
//                $('#container_sigin_message').text(T('Deve fornecer um valor númerico!'));
//                $('#container_sigin_message').css('visibility', 'visible');
//                $('#container_sigin_message').css('color', 'red');
                //modal_alert_message('O email informado não é correto');
            }
        } else {
              modal_alert_message(T('Preencha todos os dados da campanha corretamente!',language));
//            $('#container_sigin_message').text(T('Deve preencher todos os dados corretamente!'));
//            $('#container_sigin_message').css('visibility', 'visible');
//            $('#container_sigin_message').css('color', 'red');
            //modal_alert_message('Formulario incompleto');
        }
       
       
    });

    $(document).on('click', '.edit_campaing', function(){        
        reset_element("#edit_daily_value","2px solid #1fa57e");        
        clearBox('response_daily_value');        
        $("#table_search_profile2").empty();
        $('#profile_edit').val("");
        
        var id_element = $(this).data('id');
        var res = id_element.split("_");
        var id_campaing = res[res.length-1];
        $("#campaing_id").val( id_campaing );
        $.ajax({
            url: base_url + 'index.php/welcome/get_campaing_data',
            data:  {
                'campaing_id': id_campaing
            },   
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response['success']) {
                    var campaing_array = response['data'];
                    var campaing = campaing_array[0];
                    //modal_alert_message(campaing['campaing_id']);
                    $('#editar').modal('show');
                    $(".modal-content #orcamento").val(Number(campaing['total_daily_value']/100).toFixed(2));
                    $("#ativada").removeClass('play');
                    $("#pausada").removeClass('pause');
                    document.getElementById("ativada").innerHTML = '<i class="fa fa-play-circle"></i> '+T('ATIVAR',language);
                    document.getElementById("pausada").innerHTML = '<i class="fa fa-pause-circle"></i> '+T('PAUSAR',language);
                    $("#edit_daily_value").val(Number(campaing['total_daily_value']/100).toFixed(2));
                    
                    var status = campaing['campaing_status_id_string'];
                    
                    if(status == "ATIVA"){                        
                        $("#ativada").addClass('play');
                        document.getElementById("ativada").innerHTML = ' '+T('ATIVA',language);
                        document.getElementById("pausada").innerHTML = '<i class="fa fa-pause-circle"></i> '+T('PAUSAR',language);
                    }
                    else{
                        if(status == "PAUSADA"){
                            $("#pausada").addClass('pause');                            
                            document.getElementById("ativada").innerHTML = '<i class="fa fa-play-circle"></i> '+T('ATIVAR',language);
                            document.getElementById("pausada").innerHTML = ' '+T('PAUSADA',language);
                        }
                    }
                    var gasto = document.getElementById('gasto');                    
                    var total = document.getElementById('total');                    
                    var dados_captados = document.getElementById('dados_captados');                    
                    var tipo = document.getElementById('tipo');                    
                    var total = document.getElementById('total');                    
                    
                    gasto.innerText = Number((campaing['total_daily_value'] - campaing['available_daily_value'])/100).toFixed(2);
                    total.innerText = Number(campaing['total_daily_value']/100).toFixed(2);
                    dados_captados.innerText = campaing['amount_leads'];
                    tipo.innerText = T(campaing['campaing_type_id_string'],language);
                    $('#type_campaing').val((campaing['campaing_type_id']));

                    var char_type;
                    if(campaing['campaing_type_id'] == 1)
                        char_type = '';
                    if(campaing['campaing_type_id'] == 2)
                        char_type = '@';
                    if(campaing['campaing_type_id'] == 3)
                        char_type = '#';

                    var profiles = campaing['profile'];
                    var i;
                    document.getElementById("profiles_edit").innerHTML = "";
                    for (i = 0; i < profiles.length; ++i) {
                        var html = '<li id = "__' + profiles[i]['insta_id'] + '">';                                                         
                                html +=     '<span class="fleft100 ellipse">';
                                html +=           '<div class ="col-md-12 col-sm-12 col-xs-12" data-toggle="tooltip" data-placement="top" title="'+profiles[i]['profile']+'">';
                                html +=                char_type+reduced_profile(profiles[i]['profile']);
                                html +=           '</div>';
                                html +=           '<b class="my_close2">x</b>'
                                html +=      '</span>';
                                html += '</li>';
                        document.getElementById("profiles_edit").innerHTML += html;
                    }
                    
                } else {
                      modal_alert_message(response['message']);
//                                    $('#container_sigin_message').text(response['message']);
//                                    $('#container_sigin_message').css('visibility', 'visible');
//                                    $('#container_sigin_message').css('color', 'red');                                    
                }
            },
            error: function (xhr, status) {
                $('#container_sigin_message').text(T('Não foi possível executar sua solicitude!',language));
                $('#container_sigin_message').css('visibility', 'visible');
                $('#container_sigin_message').css('color', 'red');
            }
        });
    });
    
    $("#ativada").click(function () {        
        if(!$("#ativada").hasClass('play')){
            var id_campaing = $("#campaing_id").val();            
            $.ajax({
                url: base_url + 'index.php/welcome/activate_campaing',
                data:  {
                    'id_campaing': id_campaing                          
                },   
                type: 'POST',
                dataType: 'json',
                success: function (response) {
                    if (response['success']) {                        
                        $("#pausada").removeClass('pause');
                        $("#ativada").addClass('play');
                        document.getElementById("ativada").innerHTML = T('ATIVA',language);
                        document.getElementById("pausada").innerHTML = '<i class="fa fa-pause-circle"></i> '+T('PAUSAR',language);
                        
                        $("#campaing_"+id_campaing+"").removeClass('camp-silver');
                        $("#campaing_"+id_campaing+"").removeClass('camp-blue');
                        $("#campaing_"+id_campaing+"").addClass('camp-green');                                                
                        document.getElementById("campaing_status_"+id_campaing).innerHTML = T("Ativa",language);
                        //PARA MINI
                        $("#action_"+id_campaing+"").removeClass('mini_play');
                        $("#action_"+id_campaing+"").addClass('mini_pause');
                        $("#action_text_"+id_campaing+"").removeClass('fa fa-play-circle');
                        $("#action_text_"+id_campaing+"").addClass('fa fa-pause-circle');
                        
                        document.getElementById("action_text_"+id_campaing).innerHTML = T("PAUSAR",language);
                        
                        modal_alert_message(response['message']);                                            
                    } else {
                          modal_alert_message(response['message']);
        //                                    $('#container_sigin_message').text(response['message']);
        //                                    $('#container_sigin_message').css('visibility', 'visible');
        //                                    $('#container_sigin_message').css('color', 'red');                                    
                    }
                },
                error: function (xhr, status) {
                    $('#container_sigin_message').text(T('Não foi possível executar sua solicitude!',language));
                    $('#container_sigin_message').css('visibility', 'visible');
                    $('#container_sigin_message').css('color', 'red');
                }
            });                  
        }        
    });
    
    $(document).on('click', '.mini_play', function(){                
        var id_element = $(this).attr('id');
        var res = id_element.split("_");
        var id_campaing = res[res.length-1];
        
        $.ajax({
            url: base_url + 'index.php/welcome/activate_campaing',
            data:  {
                'id_campaing': id_campaing                          
            },   
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response['success']) {                                
                    $("#pausada").removeClass('pause');
                    $("#ativada").addClass('play');
                        
                    $("#campaing_"+id_campaing+"").removeClass('camp-silver');
                    $("#campaing_"+id_campaing+"").removeClass('camp-blue');
                    $("#campaing_"+id_campaing+"").addClass('camp-green');                        
                    $("#action_"+id_campaing+"").removeClass('mini_play');
                    $("#action_"+id_campaing+"").addClass('mini_pause');                        
                    $("#action_text_"+id_campaing+"").removeClass('fa fa-play-circle');
                    $("#action_text_"+id_campaing+"").addClass('fa fa-pause-circle');
                    document.getElementById("campaing_status_"+id_campaing).innerHTML = T("Ativa",language);
                    document.getElementById("action_text_"+id_campaing).innerHTML = T("PAUSAR",language);
                    modal_alert_message(response['message']);                                            
                } else {
                      modal_alert_message(response['message']);
    //                                    $('#container_sigin_message').text(response['message']);
    //                                    $('#container_sigin_message').css('visibility', 'visible');
    //                                    $('#container_sigin_message').css('color', 'red');                                    
                }
            },
            error: function (xhr, status) {
                $('#container_sigin_message').text(T('Não foi possível executar sua solicitude!',language));
                $('#container_sigin_message').css('visibility', 'visible');
                $('#container_sigin_message').css('color', 'red');
            }
        });                          
    });
    
    $("#pausada").click(function () {        
        if(!$("#pausada").hasClass('pause')){
            var id_campaing = $("#campaing_id").val();            
            $.ajax({
                url: base_url + 'index.php/welcome/pause_campaing',
                data:  {
                    'id_campaing': id_campaing                          
                },   
                type: 'POST',
                dataType: 'json',
                success: function (response) {
                    if (response['success']) {                        
                        $("#ativada").removeClass('play');
                        $("#pausada").addClass('pause');  
                        document.getElementById("ativada").innerHTML = '<i class="fa fa-play-circle"></i> '+T('ATIVAR',language);
                        document.getElementById("pausada").innerHTML = ' PAUSADA';
                        
                        $("#campaing_"+id_campaing+"").removeClass('camp-green');                        
                        $("#campaing_"+id_campaing+"").addClass('camp-silver');                        
                        document.getElementById("campaing_status_"+id_campaing).innerHTML = T("Pausada",language);
                        //PARA MINI
                        $("#action_"+id_campaing+"").removeClass('mini_pause');
                        $("#action_"+id_campaing+"").addClass('mini_play');                                                
                        $("#action_text_"+id_campaing+"").removeClass('fa fa-pause-circle');
                        $("#action_text_"+id_campaing+"").addClass('fa fa-play-circle');
                        document.getElementById("action_text_"+id_campaing).innerHTML = T("ATIVAR",language);
                        //modal_alert_message(response['message']);                                            
                    } else {
                          modal_alert_message(response['message']);
        //                                    $('#container_sigin_message').text(response['message']);
        //                                    $('#container_sigin_message').css('visibility', 'visible');
        //                                    $('#container_sigin_message').css('color', 'red');                                    
                    }
                },
                error: function (xhr, status) {
                    $('#container_sigin_message').text(T('Não foi possível executar sua solicitude!',language));
                    $('#container_sigin_message').css('visibility', 'visible');
                    $('#container_sigin_message').css('color', 'red');
                }
            });            
        }        
    });
    
    $(document).on('click', '.mini_pause', function(){                
        var id_element = $(this).attr('id');
        var res = id_element.split("_");
        var id_campaing = res[res.length-1];
        
        $.ajax({
            url: base_url + 'index.php/welcome/pause_campaing',
            data:  {
                'id_campaing': id_campaing                          
            },   
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response['success']) {                        
                    $("#ativada").removeClass('play');
                    $("#pausada").addClass('pause'); 
                        
                    $("#campaing_"+id_campaing+"").removeClass('camp-green');                        
                    $("#campaing_"+id_campaing+"").addClass('camp-silver');                        
                    document.getElementById("campaing_status_"+id_campaing).innerHTML = T("Pausada",language);
                    //PARA MINI
                    $("#action_"+id_campaing+"").removeClass('mini_pause');
                    $("#action_"+id_campaing+"").addClass('mini_play');                                                
                    $("#action_text_"+id_campaing+"").removeClass('fa fa-pause-circle');
                    $("#action_text_"+id_campaing+"").addClass('fa fa-play-circle');
                    document.getElementById("action_text_"+id_campaing).innerHTML = T("ATIVAR",language);
                    //modal_alert_message(response['message']);                                            
                } else {
                      modal_alert_message(response['message']);
    //                                    $('#container_sigin_message').text(response['message']);
    //                                    $('#container_sigin_message').css('visibility', 'visible');
    //                                    $('#container_sigin_message').css('color', 'red');                                    
                }
            },
            error: function (xhr, status) {
                $('#container_sigin_message').text(T('Não foi possível executar sua solicitude!',language));
                $('#container_sigin_message').css('visibility', 'visible');
                $('#container_sigin_message').css('color', 'red');
            }
        });
    });
        
    $("#encerrar").click(function () {        
        confirm(T("Cuidado!",language), T("Deseja terminar esta campanha?",language), T("Cancelar",language), "Ok", encerrar_campanha);
    });
    
    function encerrar_campanha() {        
        if(this.className != "pointer_mouse ativo"){
            var id_campaing = $("#campaing_id").val();            
            $.ajax({
                url: base_url + 'index.php/welcome/cancel_campaing',
                data:  {
                    'id_campaing': id_campaing                          
                },   
                type: 'POST',
                dataType: 'json',
                success: function (response) {
                    if (response['success']) {                        
                        $("#pausada").removeClass('pause');
                        $("#ativada").removeClass('play');
                        document.getElementById("ativada").innerHTML = '<i class="fa fa-play-circle"></i> '+T('ATIVAR',language);
                        document.getElementById("pausada").innerHTML = '<i class="fa fa-pause-circle"></i> '+T('ATIVAR',language);
                        
                        $('#editar').modal('hide');
                        $("#campaing_"+id_campaing+"").removeClass('camp-green');
                        $("#campaing_"+id_campaing+"").removeClass('camp-silver');
                        $("#campaing_"+id_campaing+"").removeClass('camp-blue');
                        $("#campaing_"+id_campaing+"").addClass('camp-red');                        
                        $("#edit_campaing_"+id_campaing+"").remove();                        
                        document.getElementById("campaing_status_"+id_campaing).innerHTML = T("Cancelada",language);
                        //PARA MINI
                        $("#action_"+id_campaing+"").removeClass('mini_pause');
                        $("#action_"+id_campaing+"").removeClass('mini_play');                                                
                        $("#action_text_"+id_campaing+"").removeClass('fa fa-pause-circle');
                        $("#action_text_"+id_campaing+"").removeClass('fa fa-play-circle');
                        document.getElementById("action_text_"+id_campaing).innerHTML = "";
                        modal_alert_message(response['message']);                                            
                    } else {
                          modal_alert_message(response['message']);
        //                                    $('#container_sigin_message').text(response['message']);
        //                                    $('#container_sigin_message').css('visibility', 'visible');
        //                                    $('#container_sigin_message').css('color', 'red');                                    
                    }
                },
                error: function (xhr, status) {
                    $('#container_sigin_message').text(T('Não foi possível executar sua solicitude!',language));
                    $('#container_sigin_message').css('visibility', 'visible');
                    $('#container_sigin_message').css('color', 'red');
                }
            });            
        }        
    }

    $("#do_add_profile").click(function () {           
        var id_campaing = $("#campaing_id").val();
        var id_insta = $("#profile_insta_edit").val();
        var profile = $('#profile_edit').val();
        var profile_type = $('#type_campaing').val();
        var char_type = "";
        if(profile_type == 2)
            char_type = "@";
        if(profile_type == 3)
            char_type = "#";
        $('#table_search_profile2').empty();
        if(validate_element($('#profile_insta_edit'), '^[0-9]{1,100}$') && id_insta > 0){
            if (validate_element($('#profile_edit'), '^[a-zA-Z][\-\._a-zA-Z0-9]{0,99}$')) {                               
                    var html = '<li id = "__' + id_insta + '">';                                                          
                                    html +=     '<span class="fleft100 ellipse">';
                                    html +=           '<div class ="col-md-12 col-sm-12 col-xs-12" data-toggle="tooltip" data-placement="top" title="'+profile+'">';
                                    html +=                char_type+reduced_profile(profile);
                                    html +=           '</div>';
                                    html +=           '<b class="my_close2">x</b>'
                                    html +=      '</span>';
                                    html += '</li>';
                    var html2 = '<li id = "___' + id_insta + '"> <span class ="col-md-12 col-sm-12 col-xs-12" data-toggle="tooltip" data-placement="top" title="'+profile+'">'+char_type+ reduced_profile(profile) +'</span></li>' ;  
                    
                    $.ajax({
                         url: base_url + 'index.php/welcome/add_profile',
                         data:  {                        
                             'profile': profile,                                
                             'id_campaing': id_campaing,
                             'profile_type': profile_type,
                             'insta_id': id_insta
                         },   
                         type: 'POST',
                         dataType: 'json',
                         success: function (response) {
                             if (response['success']) {                            
                                 document.getElementById("profiles_edit").innerHTML += html;
                                 document.getElementById("profiles_view_"+id_campaing).innerHTML += html2;
                                 $('#profile_edit').val('');
                                 $('#profile_insta_edit').val(0);
                                 //modal_alert_message(response['message']);                                    
                             }else {                              
                                     if(!response['old_profile'])
                                         modal_alert_message(response['message']);
                                     else{
                                         confirm_arg(T("Observação",language), T("Quer adicionar um perfil previamente eliminado?",language), T("Cancelar",language), "Ok", adicionar_old_perfil, response['old_profile']);                                    
                                     }
                             }                    
                         },
                         error: function (xhr, status) {
                             $('#container_sigin_message').text(T('Não foi possível executar sua solicitude!',language));
                             $('#container_sigin_message').css('visibility', 'visible');
                             $('#container_sigin_message').css('color', 'red');                                            
                         }
                     });
                 } else {
                   modal_alert_message(T('O nome de um perfil só pode conter combinações de letras, números, sublinhados e pontos!',language));
     //            $('#container_sigin_message').text(T('Deve preencher todos os dados corretamente!'));
     //            $('#container_sigin_message').css('visibility', 'visible');
     //            $('#container_sigin_message').css('color', 'red');
                 //modal_alert_message('Formulario incompleto');
             }
        }
        else{
            modal_alert_message(T('Deve selecionar um perfil da lista fornecida',language));
        }
    });
    
    function adicionar_old_perfil(old_profile){
        var id_campaing = $("#campaing_id").val();
        var id_insta = $("#profile_insta_edit").val();
        var profile = $('#profile_edit').val();
        var profile_type = $('#type_campaing').val();
        var char_type = "";
        if(profile_type == 2)
            char_type = "@";
        if(profile_type == 3)
            char_type = "#";
        
        var html = '<li id = "__' + id_insta + '">';                                                          
                                html +=     '<span class="fleft100 ellipse">';
                                html +=           '<div class ="col-md-12 col-sm-12 col-xs-12" data-toggle="tooltip" data-placement="top" title="'+profile+'">';
                                html +=                char_type+reduced_profile(profile);
                                html +=           '</div>';
                                html +=           '<b class="my_close2">x</b>'
                                html +=      '</span>';
                                html += '</li>';
        var html2 = '<li id = "___' + id_insta + '"> <span>'+char_type+reduced_profile(profile) +'</span></li>' ;  
                
        $.ajax({                                    
        url: base_url + 'index.php/welcome/add_existing_profile',
        data: {
            'old_profile': old_profile
        },
        type: 'POST',
        dataType: 'json',
        success: function (response) {
            if (response['success']) {
                document.getElementById("profiles_edit").innerHTML += html;
                document.getElementById("profiles_view_"+id_campaing).innerHTML += html2;
                $('#profile_edit').val('');                
                $('#profile_insta_edit').val(0);
                //modal_alert_message(response['message']);                                            
            }
            else{
                modal_alert_message(response['message']);                
            }            
            $('body').removeClass('wait');
        },
        error: function (xhr, status) {
                        $('#container_sigin_message').text(T('Não foi possível executar sua solicitude!',language));
                        $('#container_sigin_message').css('visibility', 'visible');
                        $('#container_sigin_message').css('color', 'red');                        
                    }
        });
        $('body').removeClass('wait');
    }
    
    $(document).on('click', '.my_close2', function(){        
        var profile = this.parentNode.parentNode.id;        
        confirm_arg(T("Cuidado!",language), T("Está seguro de remover o perfil desta campanha?",language), T("Cancelar",language), "Ok", remover_perfil, profile);
    });
    
    function remover_perfil(profile_to_delete){
        var profile = profile_to_delete;
        profile = profile.substr(2); //eliminado 2 _
        var id_campaing = $("#campaing_id").val();
       
        if (profile) {                
            $.ajax({
                    url: base_url + 'index.php/welcome/delete_profile',
                    data:  {                        
                        'insta_id': profile,                                
                        'id_campaing': id_campaing
                    },   
                    type: 'POST',
                    dataType: 'json',
                    success: function (response) {
                        if (response['success']) {
                            $('#__'+profile).remove();                        
                            $('#___'+profile).remove();                        
                            //modal_alert_message(response['message']);
                            
                        } else {
                              modal_alert_message(response['message']);
//                                    $('#container_sigin_message').text(response['message']);
//                                    $('#container_sigin_message').css('visibility', 'visible');
//                                    $('#container_sigin_message').css('color', 'red');                                    
                        }
                    },
                    error: function (xhr, status) {
                        $('#container_sigin_message').text(T('Não foi possível executar sua solicitude!',language));
                        $('#container_sigin_message').css('visibility', 'visible');
                        $('#container_sigin_message').css('color', 'red');
                    }
                });                
        } else {
            modal_alert_message(T('Deve fornecer um perfil',language));
//          $('#container_sigin_message').text(T('Deve preencher todos os dados corretamente!'));
//          $('#container_sigin_message').css('visibility', 'visible');
//          $('#container_sigin_message').css('color', 'red');
            //modal_alert_message('Formulario incompleto');
        }    
    }
    
    
    $("#update_daily_value").click(function () {        
        //$("#update_daily_value").css({'cursor':'wait'});        
        clearBox('response_daily_value');        
        if(!$("#ativada").hasClass('ativo')){            
            var id_campaing = $("#campaing_id").val();
            var new_daily_value = $("#edit_daily_value").val();
            new_daily_value = new_daily_value.replace(",", ""); 
           
            if (parseFloat(new_daily_value) >= min_daily_value){                    
                $.ajax({
                    url: base_url + 'index.php/welcome/update_daily_value',
                    data:  {
                        'new_daily_value': new_daily_value*100,
                        'id_campaing': id_campaing                          
                    },   
                    type: 'POST',
                    dataType: 'json',
                    success: function (response) {
                        if (response['success']) {                        
                            document.getElementById("show_total_"+id_campaing).innerText = Number(new_daily_value*100/100).toFixed(2);                                             
                            document.getElementById("total").innerHTML = Number(new_daily_value*100/100).toFixed(2);                                                                                                 
                            message_container('Orçamento diário atualizado',"#response_daily_value",'green');                                                                                
                        } else {
                              message_container(response['message'],"#response_daily_value",'red');                                                                                
                            //modal_alert_message(response['message']);
            //                                    $('#container_sigin_message').text(response['message']);
            //                                    $('#container_sigin_message').css('visibility', 'visible');
            //                                    $('#container_sigin_message').css('color', 'red');                                    
                        }                        
                    },
                    error: function (xhr, status) {
                        $('#container_sigin_message').text(T('Não foi possível executar sua solicitude!',language));
                        $('#container_sigin_message').css('visibility', 'visible');
                        $('#container_sigin_message').css('color', 'red');                        
                    }
                });
            }
            else {
                  modal_alert_message(T('O orçamento deve ser um valor monetário (não zero) com até dois valores decimais e a partir de',language)+' '+currency_symbol+' '+min_daily_value+'.00!');
    //            $('#container_sigin_message').text(T('Deve preencher todos os dados corretamente!'));
    //            $('#container_sigin_message').css('visibility', 'visible');
    //            $('#container_sigin_message').css('color', 'red');
                //modal_alert_message('Formulario incompleto');
                }
        }
        else{
            modal_alert_message(T('Para modificar o orçamento diário a campanha não pode estar ativa'),language);
        }
        //$("#update_daily_value").css({'cursor':'pointer'});                        
    });
   
    $(document).on('click', '.date_filter', function(){           
        var id_element = $(this).attr('id');
        var init_date = null, end_date = null;
        if(id_element != "tudo" || id_element != "tudo2"){            
            var res = id_element.split("_");
            var to_substract = res[res.length-1];
            init_date = (real_date(Date.now())-to_substract*(24*3600*1000))/1000;            
        }
        
        $.ajax({
            url: base_url + 'index.php/welcome/get_campaings',
            data: {
                'init_date':init_date,
                'end_date':end_date                
            },
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response['success']) {                
                    var html = show_campaings(response['data'])
                    document.getElementById("list_campaings").innerHTML = html;                       
                    document.getElementById("init_day_filter").innerHTML = toDate(response['date_interval']['init_date']);
                    document.getElementById("end_day_filter").innerHTML = toDate(response['date_interval']['end_date']);
                    $("#init_date").val(toDate(response['date_interval']['init_date']));
                    $("#end_date").val(toDate(response['date_interval']['end_date']));
                } 
                else {                 
                    document.getElementById("list_campaings").innerHTML = T('Você nao possui nenhuma criada campanha nesse periodo',language);
                }                 
            },
            error: function (xhr, status) {
                set_global_var('flag', true);
            }
        });
    });
    
    
    $("#filter_person").on("click", function(){
        var initDate = $('#init_filter').val();
        initDate = initDate.split("/");        
        var init_date = toTimestamp(initDate[1]+"/"+initDate[0]+"/"+initDate[2]);
        
        var endDate = $('#end_filter').val();
        endDate = endDate.split("/");        
        var end_date = toTimestamp(endDate[1]+"/"+endDate[0]+"/"+endDate[2]);
        
        if(init_date <= end_date || !end_date){
            $.ajax({
                url: base_url + 'index.php/welcome/get_campaings',
                data: {
                    'init_date':init_date,
                    'end_date':end_date                
                },
                type: 'POST',
                dataType: 'json',
                success: function (response) {
                    if (response['success']) {                
                        var html = show_campaings(response['data'])
                        document.getElementById("list_campaings").innerHTML = html;                       
                        document.getElementById("init_day_filter").innerHTML = toDate(response['date_interval']['init_date']);
                        document.getElementById("end_day_filter").innerHTML = toDate(response['date_interval']['end_date']);
                        $("#init_date").val(toDate(response['date_interval']['init_date']));
                        $("#end_date").val(toDate(response['date_interval']['end_date']));
                    } 
                    else {                 
                        document.getElementById("list_campaings").innerHTML = T('Você nao possui nenhuma campanha criada nesse periodo',language);
                    }                 
                },
                error: function (xhr, status) {
                    set_global_var('flag', true);
                }
            });
        }
        else{
            modal_alert_message("A data incial deve ser anterior à data final");
        }
    });
    
    $("#salvar_modo_pago").on("click", function(){
        if($("#pago_cartao").hasClass('ativo')){
            save_credit_card('#credit_card_name', '#credit_card_number', '#credit_card_cvc',
                             '#credit_card_exp_month', '#credit_card_exp_year', this);
        }
        else{            
            save_bank_ticket_datas('#boleto_nome', '#boleto_value', '#boleto_cpf', '#boleto_cpe', '#boleto_endereco',
                                   '#boleto_numero', '#boleto_bairro', '#boleto_municipio', 
                                   '#boleto_estado', this);
        }
    });
    
    $("#find_cep").click(function () { 
        var l = Ladda.create(this);  l.start();
        $.ajax({
            url: base_url + 'index.php/welcome/get_cep_datas',
            data: {'cep':$('#boleto_cpe').val()},
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response['success']) {                    
                    //modal_alert_message(response['datas']);          
                    $('#boleto_endereco').val(response['datas']['logradouro']);
                    $('#boleto_numero').val(response['datas']['complemento']);                    
                    $('#boleto_bairro').val(response['datas']['bairro']);
                    $('#boleto_municipio').val(response['datas']['localidade']);
                    $('#boleto_estado').val(response['datas']['uf']);
                } 
                else {                 
                    modal_alert_message("CEP não encontrado");
                }                 
                l.stop();
            },
            error: function (xhr, status) {
                set_global_var('flag', true);
                l.stop();
            }
        });
    });
    
    function save_credit_card(credit_card_name, credit_card_number, credit_card_cvc, credit_card_exp_month, credit_card_exp_year, object ){
                      
        if (($(credit_card_name).val()).toUpperCase()==='VISA' || ($(credit_card_name).val()).toUpperCase()==='MASTERCARD') {
            modal_alert_message("Informe seu nome no cartão e não a bandeira dele.");
        }

        var name = validate_element(credit_card_name, "^[A-Z ]{4,50}$");
        var number = validate_element(credit_card_number, "^[0-9]{10,20}$");

        if (number) {
            // Validating a Visa card starting with 4, length 13 or 16 digits.
            number = validate_element(credit_card_number, "^(?:4[0-9]{12}(?:[0-9]{3})?)$");

            if (!number) {
                // Validating a MasterCard starting with 51 through 55, length 16 digits.
                number = validate_element(credit_card_number, "^(?:5[1-5][0-9]{14})$");

                if (!number) {
                    // Validating a American Express credit card starting with 34 or 37, length 15 digits.
                    number = validate_element(credit_card_number, "^(?:3[47][0-9]{13})$");

                    if (!number) {
                        // Validating a Discover card starting with 6011, length 16 digits or starting with 5, length 15 digits.
                        number = validate_element(credit_card_number, "^(?:6(?:011|5[0-9][0-9])[0-9]{12})$");

                        if (!number) {
                            // Validating a Diners Club card starting with 300 through 305, 36, or 38, length 14 digits.
                            number = validate_element(credit_card_number, "^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$");

                            if (!number) {
                                // Validating a Elo credit card
                                number = validate_element(credit_card_number, "^(?:((((636368)|(438935)|(504175)|(451416)|(636297))[0-9]{0,10})|((5067)|(4576)|(4011))[0-9]{0,12}))$");

                                if (!number) {
                                    // Validating a Hypercard
                                    number = validate_element(credit_card_number, "^(?:(606282[0-9]{10}([0-9]{3})?)|(3841[0-9]{15}))$");
                                }
                            }
                        }
                    }
                }
            }
        }

        var cvv = validate_element(credit_card_cvc, "^[0-9]{3,4}$");
        var month = validate_month(credit_card_exp_month, "^(0?[1-9]|1[012])$");
        //validate_element('#client_email', "^([2-9][0-9]{3})$");
        var year = validate_year(credit_card_exp_year, "^([2-9][0-9]{3})$");            
        var date = validate_date($(credit_card_exp_month).val(),$(credit_card_exp_year).val());            
        if (name && number && cvv && month && year) {
            if (date) {
                //modal_alert_message('Dados corretos!');
                var datas={                    
                    'credit_card_number': $(credit_card_number).val(),
                    'credit_card_cvc': $(credit_card_cvc).val(),
                    'credit_card_name': $(credit_card_name).val(),
                    'credit_card_exp_month': $(credit_card_exp_month).val(),
                    'credit_card_exp_year': $(credit_card_exp_year).val()                                        
                };                
                var l = Ladda.create(object);  l.start();            
                $.ajax({
                    url: base_url + 'index.php/welcome/add_credit_card',
                    data: datas,
                    type: 'POST',
                    dataType: 'json',
                    success: function (response) {
                        if (response['success']) {
                            $('#credit_card_name').val('');
                            $('#credit_card_number').val('');
                            $('#credit_card_cvc').val('');                            
                            
                            modal_alert_message(response['message']);           
                            document.getElementById("alerta_pago").innerHTML = '';
                            //document.getElementById("ops").innerHTML = '';                            
                        } else {
                            if(!response['existing_card'])
                                modal_alert_message(response['message']);
                            else{                                
                                confirm_arg(T("Observação",language), T("Quer sobrescrever os dados de seu cartão?",language), T("Cancelar",language), "Ok", atualizar_cartao, datas);                                                                    
                            }
                        }
                        l.stop();
                    },
                    error: function (xhr, status) {
                        set_global_var('flag', true);
                        l.stop();
                    }
                });
            } else {
                modal_alert_message(T('A data fornecida ñao foi aceitada',language));
            }   
        } else{
            modal_alert_message(T('Verifique os dados fornecidos',language));
        }        
    }
    
    function atualizar_cartao(datas){
        $.ajax({                                    
        url: base_url + 'index.php/welcome/update_credit_card',
        data: datas,
        type: 'POST',
        dataType: 'json',        
        success: function (response2) {
            if (response2['success']) {
                $('#credit_card_name').val('');
                $('#credit_card_number').val('');
                $('#credit_card_cvc').val('');
                
                modal_alert_message(response2['message']);
                document.getElementById("alerta_pago").innerHTML = '';
            }
            else{
                modal_alert_message(response2['message']);
            }
        }
        });
    }
    
         
    function save_bank_ticket_datas(boleto_nome, boleto_value, boleto_cpf, boleto_cpe, boleto_endereco,
                                    boleto_numero, boleto_bairro, boleto_municipio, 
                                    boleto_estado, object){
        if( $(boleto_nome).val() && $(boleto_value).val() && $(boleto_cpf).val() && $(boleto_cpe).val() && $(boleto_endereco).val()
            && $(boleto_numero).val() && $(boleto_bairro).val() && $(boleto_municipio).val() && $(boleto_estado).val()){
            var money_value = $(boleto_value).val(); 
            money_value = money_value.replace(",", ""); 
            
            if(parseFloat(money_value) >= min_ticket_bank ) {
                var cpf = $(boleto_cpf).val();                
                cpf = cpf.replace(/[.-]/g, '');
                
                if(validaCPF(cpf) || validaCNPJ(cpf)){                    
                        
                        var cep = $(boleto_cpe).val(); 
                        cep = cep.replace("-", ""); 
                        
                        var datas = {
                                    'name_in_ticket' : $(boleto_nome).val(),
                                    'emission_money_value' : money_value*100,
                                    'cpf' : cpf,
                                    'cep' : cep,
                                    'street_address' : $(boleto_endereco).val(),
                                    'house_number' : $(boleto_numero).val(),
                                    'neighborhood_address' : $(boleto_bairro).val(),
                                    'municipality_address' : $(boleto_municipio).val(),
                                    'state_address' : $(boleto_estado).val()
                                    };
                        var l = Ladda.create(object);  l.start();            
                        $.ajax({
                                url: base_url + 'index.php/welcome/add_bank_ticket',
                                data: datas,
                                type: 'POST',
                                dataType: 'json',
                                success: function (response) {
                                    if (response['success']) {                                    
                                        modal_alert_message(response['message']);                                    
                                        document.getElementById("alerta_pago").innerHTML = '';
                                        //document.getElementById("ops").innerHTML = '';
                                    } 
                                    else {                            
                                         modal_alert_message(response['message']);                            
                                    }
                                    l.stop();
                                },
                                error: function (xhr, status) {
                                    set_global_var('flag', true);
                                    l.stop();
                                }
                            });                        
                }
                else{
                    modal_alert_message(T("Formato incorreto para o cpf",language));
                }                       
            }
            else{
                var message_error = T("O valor minimo por boleto deve ser a partir de",language) + " " + currency_symbol + " " + min_ticket_bank + ".00";
                modal_alert_message(message_error);
            }
        }
        else{
            modal_alert_message(T("Deve fornecer todos os dados",language));
        }
    }
    
    $("#do_save_cupom").click(function () {                       
         
        var name = validate_element('#credit_card_name_cupom', "^[A-Z ]{4,50}$");
        var number = validate_element('#credit_card_number_cupom', "^[0-9]{10,20}$");

        if (number) {
            // Validating a Visa card starting with 4, length 13 or 16 digits.
            number = validate_element('#credit_card_number_cupom', "^(?:4[0-9]{12}(?:[0-9]{3})?)$");

            if (!number) {
                // Validating a MasterCard starting with 51 through 55, length 16 digits.
                number = validate_element('#credit_card_number_cupom', "^(?:5[1-5][0-9]{14})$");

                if (!number) {
                    // Validating a American Express credit card starting with 34 or 37, length 15 digits.
                    number = validate_element('#credit_card_number_cupom', "^(?:3[47][0-9]{13})$");

                    if (!number) {
                        // Validating a Discover card starting with 6011, length 16 digits or starting with 5, length 15 digits.
                        number = validate_element('#credit_card_number_cupom', "^(?:6(?:011|5[0-9][0-9])[0-9]{12})$");

                        if (!number) {
                            // Validating a Diners Club card starting with 300 through 305, 36, or 38, length 14 digits.
                            number = validate_element('#credit_card_number_cupom', "^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$");

                            if (!number) {
                                // Validating a Elo credit card
                                number = validate_element('#credit_card_number_cupom', "^(?:((((636368)|(438935)|(504175)|(451416)|(636297))[0-9]{0,10})|((5067)|(4576)|(4011))[0-9]{0,12}))$");

                                if (!number) {
                                    // Validating a Hypercard
                                    number = validate_element('#credit_card_number_cupom', "^(?:(606282[0-9]{10}([0-9]{3})?)|(3841[0-9]{15}))$");
                                }
                            }
                        }
                    }
                }
            }
        }

        var cvv = validate_element('#credit_card_cvc_cupom', "^[0-9]{3,4}$");
        var month = validate_month('#credit_card_exp_month_cupom', "^(0?[1-9]|1[012])$");
        //validate_element('#client_email', "^([2-9][0-9]{3})$");
        var year = validate_year('#credit_card_exp_year_cupom', "^([2-9][0-9]{3})$");            
        var date = validate_date($('#credit_card_exp_month_cupom').val(),$('#credit_card_exp_year_cupom').val());            
        if (name && number && cvv && month && year) {
            if (date) {
                //modal_alert_message('Dados corretos!');                
                var datas={                    
                    'credit_card_number': $('#credit_card_number_cupom').val(),
                    'credit_card_cvc': $('#credit_card_cvc_cupom').val(),
                    'credit_card_name': $('#credit_card_name_cupom').val(),
                    'credit_card_exp_month': $('#credit_card_exp_month_cupom').val(),
                    'credit_card_exp_year': $('#credit_card_exp_year_cupom').val(),                                        
                    'option': $('input[name=cupom_option]:checked', '#form_cupom').val()                                        
                };                
                var l = Ladda.create(this);  l.start();            
                $.ajax({
                    url: base_url + 'index.php/welcome/add_credit_card_cupom',
                    data: datas,
                    type: 'POST',
                    dataType: 'json',
                    success: function (response) {
                        if (response['success']) {
                            $('#credit_card_name_cupom').val('');
                            $('#credit_card_number_cupom').val('');
                            $('#credit_card_cvc_cupom').val('');                            
                            
                            modal_alert_message(response['message']);           
                            document.getElementById("alerta_pago").innerHTML = '';
                            //document.getElementById("ops").innerHTML = '';                            
                        } 
                        else {                          
                            modal_alert_message(response['message']);                           
                        }
                        l.stop();
                    },
                    error: function (xhr, status) {
                        set_global_var('flag', true);
                        l.stop();
                    }
                });
            } else {
                modal_alert_message(T('A data fornecida ñao foi aceitada',language));
            }   
        } else{
            modal_alert_message(T('Verifique os dados fornecidos',language));
        }        
    });
    
    $(document).on('click', '.extraer_leads', function(){ 
        var id_element = $(this).data('id');
        var res = id_element.split("_");
        var id_campaing = res[res.length-1];        
        
        $('#id_campaing_leads').val(id_campaing);
        $('#extraer').modal('show');
    });
    
    
    $("#do_get_leads").on("click", function(){        
        var id_campaing = $('#id_campaing_leads').val();        
        var info_to_get = [];//$('.inf:checked').serialize();        
        
        var chk_arr =  document.getElementsByName("inf[]");
        var chklength = chk_arr.length;             

        for(k=0; k < chklength; k++)
        {
            if(chk_arr[k]["checked"]){
                info_to_get.push( chk_arr[k]["defaultValue"] );
            }
        }
        
        var initDate = $('#init_date').val();
        initDate = initDate.split("/");        
        var init_date = toTimestamp(initDate[1]+"/"+initDate[0]+"/"+initDate[2]);
        
        var endDate = $('#end_date').val();
        endDate = endDate.split("/");        
        var end_date = toTimestamp(endDate[1]+"/"+endDate[0]+"/"+endDate[2]);
                
        if(init_date && end_date){
            if(init_date <= end_date){
//                $(location).attr('href',base_url+'index.php/welcome/file_leads?id_campaing='+id_campaing+'&init_date='+init_date+'&end_date='+end_date+'&info_to_get='+info_to_get);                                        
//                return;
                $.ajax({
                type: "POST",
                url: base_url + 'index.php/welcome/get_leads_client', //calling method in controller
                data: {
                    id_campaing: id_campaing,
                    //profile: profile,
                    init_date: init_date,
                    end_date: end_date,
                    info_to_get: info_to_get
                },
                dataType:'json',
                success: function (response) {
                    if (response['success']) {
                        $(location).attr('href',base_url+'index.php/welcome/file_leads?id_campaing='+id_campaing+'&init_date='+init_date+'&end_date='+end_date+'&info_to_get='+info_to_get);                                                            
                    }
                    else{
                        modal_alert_message(response['message']);
                    }
                },
                error: function (xhr, status) {
                    modal_alert_message('Ooops ... problema no servidor'); 
                }
            });
            }
            else
            {
                modal_alert_message(T("A data incial deve ser anterior à data final",language));
            }  
        }
        else
            modal_alert_message(T("Deve fornecer o intervalo válido de datas para a extração",language));
    });
    
    $("#do_save_cupom50").on("click", function(){        
        var code = $("#code_cupom50").val();
        $.ajax({
                type: "POST",
                url: base_url + 'index.php/welcome/save_cupom50', 
                data: {
                    code: code                    
                },
                dataType:'json',
                success: function (response) {
                    modal_alert_message(response['message']);
                },
                error: function (xhr, status) {
                    modal_alert_message('Ooops ... problema no servidor'); 
                }
            });
    });
    
    $('#profile_temp').keyup(function() {
        var campaing_type = $("#campaing_type").val();
        var pre_char = "";
        if(campaing_type == 3)
            pre_char = "%23";
        $('#profile_type_temp').val(0);            
        $('#profile_insta_temp').val(0);        
        
        $.ajax({
            url: 'https://www.instagram.com/web/search/topsearch/?context=blended&query='+ pre_char + $('#profile_temp').val(),
            data: {},
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                $("#table_search_profile").empty();
                $('#reference_profile_message').css('visibility', 'hidden');
                if (campaing_type == 1 && response['users'].length !== 0) {
                    var i = 0;
                    var username, full_name, profile_pic_url, is_verified;
                    while (response['users'][i]) {
                        username = response['users'][i]['user']['username'];
                        full_name = response['users'][i]['user']['full_name'];
                        profile_pic_url = response['users'][i]['user']['profile_pic_url'];
                        is_verified = response['users'][i]['user']['is_verified'];
                        $("#table_search_profile").append("<tr class='row' id='row_prof_"+i+"'>");
                        $("#table_search_profile").append("<td class='col' id='col_1_prof_"+i+"'>"+
                            "<img style='border: solid 1px #efefef; border-radius: 40px; height: 40px; width: 40px; margin: 10px 0 0 0;' src='" + profile_pic_url + "' onclick='select_profile_from_search(\"" + username + "\","+"\""+ response['users'][i]['user']['pk'] + "\");'>");
                        $("#table_search_profile").append("<td class='col' id='col_2_prof_"+i+"' style='text-align: left;'>"+
                            "<div class='tt-suggestion' style='text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; height: 50px;' onclick='select_profile_from_search(\"" + username + "\","+"\""+ response['users'][i]['user']['pk'] + "\");'>"+
                                "<div><span><strong>" + username + "</strong></span>" +
                                ((is_verified) ? "<span style='color: blue' class='glyphicon glyphicon-certificate'></span>" : "") +
                                "</div><span style='color: gray;'>" + full_name + "</span></div></td></tr>");
                        i++;
                    }
                    
                } else {
                    if (campaing_type == 2 && response['places'].length !== 0) {
                        var i = 0;
                        var location_name, location_address, location_city, place_slug;
                        while (response['places'][i]) {
                            location_name = response['places'][i]['place']['location']['name'];
                            location_address = response['places'][i]['place']['location']['address'];
                            location_city = response['places'][i]['place']['location']['city'];
                            place_slug = response['places'][i]['place']['slug'];
                            $("#table_search_profile").append("<tr class='row' id='row_geo_"+i+"'>");
                            $("#table_search_profile").append("<td class='col' id='col_1_geo_"+i+"'>"+
                                "<div><span style='font-size: 30px; color:gray; margin-top: 10px;' class='glyphicon glyphicon-map-marker'></span></div></td>");
                            $("#table_search_profile").append("<td class='col' id='col_2_geo_"+i+"' style='text-align: left; vertical-align: middle;'>" +
                                "<div class='tt-suggestion' style='text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; height: 50px;' onclick='select_geolocalization_from_search(\"" + place_slug + "\","+"\""+ response['places'][i]['place']['location']['pk'] + "\");'>" +
                                    "<strong>" + location_name + "</strong><br><span style='color: gray;'>"+
                                    location_address +
                                    ((location_address && location_city) ? ", " : "") +
                                    location_city + "</span></div></td></tr>");
                            i++;
                        }
                    } 
                    else{
                        if (campaing_type == 3 && response['hashtags'].length !== 0) {
                            var i = 0;
                            var hashtag_name;
                            while (response['hashtags'][i]) {
                                hashtag_name = response['hashtags'][i]['hashtag']['name'];
                                $("#table_search_profile").append("<tr class='row' id='row_tag_"+i+"'>");
                                $("#table_search_profile").append("<td class='col' id='col_tag_"+i+"' style='text-align: left'><div class='tt-suggestion' onclick='select_hashtag_from_search(\"" + hashtag_name + "\","+"\""+ response['hashtags'][i]['hashtag']['id'] + "\");'>" +
                                    "<strong>#" + hashtag_name+"</strong><br><span style='color: gray;'>"+
                                    response['hashtags'][i]['hashtag']['media_count'] + ' '+T('publicações',language) + "</span></div></td></tr>");
                                i++;
                            }

                        }
                        else{
                            if ($('#login_profile').val() !== '') {
                                $("#table_search_profile").append("<tr class='row'><td class='col'>"+T('Nenhum resultado encontrado.',language)+"</td></tr>");
                                $('#reference_profile_message').css('visibility', 'hidden');
                            }
                        }
                    }
                }
            },
            error: function (xhr, status) {
                $('#reference_profile_message').text(T('Não foi possível conectar com o Instagram',language));
                $('#reference_profile_message').css('visibility', 'visible');
                $('#reference_profile_message').css('color', 'red');
            }
        });
    }); 
    
    $('#profile_edit').keyup(function() {
        var campaing_type = $("#type_campaing").val();
        var pre_char = "";
        if(campaing_type == 3)
            pre_char = "%23";       
        $('#profile_insta_edit').val(0);        
        
        $.ajax({
            url: 'https://www.instagram.com/web/search/topsearch/?context=blended&query='+ pre_char + $('#profile_edit').val(),
            data: {},
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                $("#table_search_profile2").empty();
                $('#reference_profile_message2').css('visibility', 'hidden');
                if (campaing_type == 1 && response['users'].length !== 0) {
                    var i = 0;
                    var username, full_name, profile_pic_url, is_verified;
                    while (response['users'][i]) {
                        username = response['users'][i]['user']['username'];
                        full_name = response['users'][i]['user']['full_name'];
                        profile_pic_url = response['users'][i]['user']['profile_pic_url'];
                        is_verified = response['users'][i]['user']['is_verified'];
                        $("#table_search_profile2").append("<tr class='row' id='edit_row_prof_"+i+"'>");
                        $("#table_search_profile2").append("<td class='col' id='edit_col_1_prof_"+i+"'>"+
                            "<img style='border: solid 1px #efefef; border-radius: 40px; height: 40px; width: 40px; margin: 10px 0 0 0;' src='" + profile_pic_url + "' onclick='select_profile_from_search2(\"" + username + "\","+"\""+ response['users'][i]['user']['pk'] + "\");'>");
                        $("#table_search_profile2").append("<td class='col' id='edit_col_2_prof_"+i+"' style='text-align: left;'>"+
                            "<div class='tt-suggestion' style='text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; height: 50px;' onclick='select_profile_from_search2(\"" + username + "\","+"\""+ response['users'][i]['user']['pk'] + "\");'>"+
                                "<div><span><strong>" + username + "</strong></span>" +
                                ((is_verified) ? "<span style='color: blue' class='glyphicon glyphicon-certificate'></span>" : "") +
                                "</div><span style='color: gray;'>" + full_name + "</span></div></td></tr>");
                        i++;
                    }
                    
                } else {
                    if (campaing_type == 2 && response['places'].length !== 0) {
                        var i = 0;
                        var location_name, location_address, location_city, place_slug;
                        while (response['places'][i]) {
                            location_name = response['places'][i]['place']['location']['name'];
                            location_address = response['places'][i]['place']['location']['address'];
                            location_city = response['places'][i]['place']['location']['city'];
                            place_slug = response['places'][i]['place']['slug'];
                            $("#table_search_profile2").append("<tr class='row' id='edit_row_geo_"+i+"'>");
                            $("#table_search_profile2").append("<td class='col' id='edit_col_1_geo_"+i+"'>"+
                                "<div><span style='font-size: 30px; color:gray; margin-top: 10px;' class='glyphicon glyphicon-map-marker'></span></div></td>");
                            $("#table_search_profile2").append("<td class='col' id='edit_col_2_geo_"+i+"' style='text-align: left; vertical-align: middle;'>" +
                                "<div class='tt-suggestion' style='text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; height: 50px;' onclick='select_geolocalization_from_search2(\"" + place_slug + "\","+"\""+ response['places'][i]['place']['location']['pk'] + "\");'>" +
                                    "<strong>" + location_name + "</strong><br><span style='color: gray;'>"+
                                    location_address +
                                    ((location_address && location_city) ? ", " : "") +
                                    location_city + "</span></div></td></tr>");
                            i++;
                        }
                    } 
                    else{
                        if (campaing_type == 3 && response['hashtags'].length !== 0) {
                            var i = 0;
                            var hashtag_name;
                            while (response['hashtags'][i]) {
                                hashtag_name = response['hashtags'][i]['hashtag']['name'];
                                $("#table_search_profile2").append("<tr class='row' id='edit_row_tag_"+i+"'>");
                                $("#table_search_profile2").append("<td class='col' id='col_tag_"+i+"' style='text-align: left'><div class='tt-suggestion' onclick='select_hashtag_from_search2(\"" + hashtag_name + "\","+"\""+ response['hashtags'][i]['hashtag']['id'] + "\");'>" +
                                    "<strong>#" + hashtag_name+"</strong><br><span style='color: gray;'>"+
                                    response['hashtags'][i]['hashtag']['media_count'] + ' '+T('publicações',language) + "</span></div></td></tr>");
                                i++;
                            }

                        }
                        else{
                            if ($('#login_profile2').val() !== '') {
                                $("#table_search_profile2").append("<tr class='row'><td class='col'>"+T('Nenhum resultado encontrado.',language)+"</td></tr>");
                                $('#reference_profile_message2').css('visibility', 'hidden');
                            }
                        }
                    }
                }
            },
            error: function (xhr, status) {
                $('#reference_profile_message2').text(T('Não foi possível conectar com o Instagram',language));
                $('#reference_profile_message2').css('visibility', 'visible');
                $('#reference_profile_message2').css('color', 'red');
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
            '<button id="okButton" type="button" class="btn btngreen active text-center ladda-button" data-style="expand-left" data-spinner-color="#ffffff">'+
                        '<spam class="ladda-label"><div style="color:white; font-weight:bold">'+
                            okButtonTxt+
                        '</div></spam>'+
            '</button>'+
            '<button id="cancelButton" data-dismiss="modal" type="button" class="btn btn-default active text-center ladda-button" data-style="expand-left" data-spinner-color="#ffffff">'+
                        '<spam class="ladda-label"><div style="color:white; font-weight:bold">'+
                            cancelButtonTxt+
                        '</div></spam>'+
            '</button>'+
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
            '<button id="okButton2" type="button" class="btn btngreen active text-center ladda-button" data-style="expand-left" data-spinner-color="#ffffff">'+
                        '<spam class="ladda-label"><div style="color:white; font-weight:bold">'+
                            okButtonTxt+
                        '</div></spam>'+
            '</button>'+
            '<button id="cancelButton" data-dismiss="modal" type="button" class="btn btn-default active text-center ladda-button" data-style="expand-left" data-spinner-color="#ffffff">'+
                        '<spam class="ladda-label"><div style="color:white; font-weight:bold">'+
                            cancelButtonTxt+
                        '</div></spam>'+
            '</button>'+            
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
    
 function message_created_campaing() {

    var confirmModal = 
      $('<div class="modal fade" style="top:30%" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +        
          '<div class="modal-dialog modal-sm" role="document">' +
          '<div class="modal-content">' +
          '<div class="modal-header">' +
            '<button id="btn_modal_close" type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                '<img src="'+base_url+'assets/img/FECHAR.png">'+
            '</button>' +
            '<h5 class="modal-title"><b>' + T('Campanha criada!',language) +'</b></h5>' +
          '</div>' +

          '<div class="modal-body">' +
            '<p>' + '<img src="'+base_url +'assets/img/ativar_hint.png" width="96" height="96" ALIGN="right" >'+ 
            T('Sua campanha foi criada exitosamente! Para poder comenzar a extraer leads deve ativar sua campanha.',language)  +
            '</p>'+ 
          '</div>' +

          '<div class="modal-footer">' +            
            '<button id="okButtonCP" type="button" data-dismiss="modal" class="btn btngreen active text-center ladda-button" data-style="expand-left" data-spinner-color="#ffffff">'+
                '<spam class="ladda-label"><div style="color:white; font-weight:bold">OK</div></spam>'+
            '</button>'+
          '</div>' +
          '</div>' +
          '</div>' +
        '</div>');

        confirmModal.find('#okButtonCP').click(function(event) {
            confirmModal.modal('hide');
        });
        confirmModal.modal('show');    
  };  
    /* END Generic Confirm func */
 
 
    $('#mark_all').click(function(event) { 
        var flag = this.checked;
        $(':checkbox').each(function() {
            this.checked = flag;                        
        });
    });
    
    setInterval(function() {
        //your jQuery ajax code each X minutes
        $.ajax({
            url: base_url + 'index.php/welcome/get_campaings',            
            type: 'POST',
            data: {
                    refresh: true                   
                },
            dataType: 'json',
            success: function (response) {
                if (response['success']) {                
                    var campaings = response['data'];
                    var num_campaings = campaings.length;
                    var total_capt = 0;
                    for(i = 0; i < num_campaings; i++)
                    {                        
                        var captured = campaings[i]['amount_leads'];
                        var gastado = Number((campaings[i]['total_daily_value'] - campaings[i]['available_daily_value'])/100).toFixed(2);
                        total_capt += captured;
                        
                        if ( $( "#show_gasto_"+campaings[i]['campaing_id'] ).length ){
                            document.getElementById('show_gasto_'+campaings[i]['campaing_id']).innerHTML = gastado;  
                        }
                        if ( $( "#capt_"+campaings[i]['campaing_id'] ).length ){
                            document.getElementById('capt_'+campaings[i]['campaing_id']).innerHTML = captured;  
                        }
                    }                    
                    document.getElementById('total_capt').innerHTML = total_capt;  
                    document.getElementById('total_gast').innerHTML = Number(total_capt*price_lead/100).toFixed(2);  
                }                                
            },
            error: function (xhr, status) {
                set_global_var('flag', true);
            }
        });
    }, 1000 * 60 * 5); 
    
    $("#daily_value").maskMoney();
    $("#edit_daily_value").maskMoney();
    $("#boleto_value").maskMoney();
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

function select_hashtag_from_search(tag_name, id) {    
    $('#profile_temp').val(tag_name);
    $('#profile_type_temp').val(3);    
    $('#profile_insta_temp').val(id);    
    $("#table_search_profile").empty();
}

function select_geolocalization_from_search(geo_name,id) {
    $('#profile_temp').val(geo_name);
    $('#profile_type_temp').val(2);    
    $('#profile_insta_temp').val(id);    
    $("#table_search_profile").empty();
}

function select_profile_from_search(prof_name, id) {
    $('#profile_temp').val(prof_name);
    $('#profile_type_temp').val(1);    
    $('#profile_insta_temp').val(id);    
    $("#table_search_profile").empty();    
}

function select_hashtag_from_search2(tag_name, id) {
    $('#profile_edit').val(tag_name);    
    $('#profile_insta_edit').val(id);    
    $("#table_search_profile2").empty();    
}

function select_geolocalization_from_search2(geo_name, id) {
    $('#profile_edit').val(geo_name);
    $('#profile_insta_edit').val(id);    
    $("#table_search_profile2").empty();
}

function select_profile_from_search2(prof_name, id) {
    $('#profile_edit').val(prof_name);
    $('#profile_insta_edit').val(id);    
    $("#table_search_profile2").empty();
}

function reduced_profile(profile){
    var str_temp = profile;
    if(str_temp.length >= 9)
        return str_temp.substring(7, 0)+"...";
    return profile;
}

function concert_especial_char(str){
    str.replace(String.fromCharCode(46),String.fromCharCode(92,46));
    return str;
}

function show_campaings(campaings){
    var html = '';
    var num_campaings = campaings.length;
    var i, total_capt = 0;
    var color_status = [];
    color_status["ATIVA"] = "camp-green";
    color_status["PAUSADA"] = "camp-silver";
    color_status["TERMINADA"] = "camp-silver";
    color_status["CANCELADA"] = "camp-red";
    color_status["CRIADA"] = "camp-blue";
    
    for(i = 0; i < num_campaings; i++)
    {
        total_capt += campaings[i]['amount_leads'];        

        //var campaing = campaings[i];        
        html += '<div id = "campaing_'+campaings[i]['campaing_id']+'" class="fleft100 bk-silver camp '+ color_status[campaings[i]['campaing_status_id_string']]+' m-top20 center-xs">'+ 
                    '<div class="col-md-2 col-sm-2 col-xs-12 m-top10">'+
                    '<span class="bol fw-600 fleft100 ft-size15"><i></i> '+T('Campanha',language)+'</span>'+
                    '<span id = "campaing_status_'+campaings[i]['campaing_id']+'" class="fleft100">'+capitalize(T(campaings[i]['campaing_status_id_string'],language))+'</span>'+
                    '<span class="ft-size13">'+T('Inicio',language)+': '+ toDate(campaings[i]['created_date'])+'</span> ';                                                        
                if(campaings[i]['end_date'])
                    html += '<span class="ft-size13">'+T('Fim',language)+': '+toDate(campaings[i]['end_date'])+'</span>';
            html += '<ul class="fleft75 bs2">';    
        
                if(campaings[i]['campaing_status_id'] == 1 || campaings[i]['campaing_status_id'] == 3)        
                    html += '<li><a id="action_' + campaings[i]['campaing_id']+'" class = "mini_play pointer_mouse"><i id = "action_text_'+campaings[i]['campaing_id']+'" class="fa fa-play-circle"> '+T('ATIVAR',language)+'</i></a></li>';                                                          
        
                if(campaings[i]['campaing_status_id'] == 2)        
                    html += '<li><a id="action_' + campaings[i]['campaing_id']+'" class = "mini_pause pointer_mouse"><i id = "action_text_'+campaings[i]['campaing_id']+'" class="fa fa-play-circle"> '+T('PAUSAR',language)+'</i></a></li>';                                                          
            html += '</ul>'+
                    '</div>'+
                    '<div class="col-md-4 col-sm-4 col-xs-12">'+
                        '<ul class="key m-top20-xs">'+
                            '<div id = "profiles_view_'+campaings[i]['campaing_id']+'">';
            
            var profiles = campaings[i]['profile'];
            var k;            
            for (k = 0; k < profiles.length; ++k) {
                if(profiles[k]){
                    html += '<li id = "___'+profiles[k]['insta_id']+'">'+'<span class ="col-md-12 col-sm-12 col-xs-12" data-toggle="tooltip" data-placement="top" title="'+profiles[k]['profile']+'">';
                    if(campaings[i]['campaing_type_id'] == 1)
                        html += reduced_profile(profiles[k]['profile']);
                    
                    if(campaings[i]['campaing_type_id'] == 2)
                        html += '@'+reduced_profile(profiles[k]['profile']);
                    
                    if(campaings[i]['campaing_type_id'] == 3)
                        html += '#'+reduced_profile(profiles[k]['profile']);                                                               
                }                    
            }
            html += '</span> </li> </div> </ul> </div>';
            html += '<div class="col-md-3 col-sm-3 col-xs-12 m-top20-xs">'+
                    '<span class="fleft100 ft-size12">'+T('Tipo',language)+': <span class="cl-green">'+ T(campaings[i]['campaing_type_id_string'],language)+'</span></span>'+
                    '<span class="fleft100 fw-600 ft-size16"> <label id="capt_'+campaings[i]['campaing_id']+'">'+campaings[i]['amount_leads']+'</label> '+T('leads captados',language)+'</span>'+
                    '<span class="ft-size11 fw-600 m-top8 fleft100">'+T('Gasto atual',language)+': <br>'+currency_symbol+' <label id="show_gasto_'+campaings[i]['campaing_id']+'">'+Number((campaings[i]['total_daily_value'] - campaings[i]['available_daily_value'])/100).toFixed(2)+'</label> '+T('de',language)+' <span class="cl-green">'+currency_symbol+' <label id="show_total_'+campaings[i]['campaing_id']+'">'+Number(campaings[i]['total_daily_value']/100).toFixed(2)+'</label></span></span>'+
                    '</div>';
            html += '<div id="divcamp_'+campaings[i]['campaing_id']+'" class="col-md-3 col-sm-3 col-xs-12 text-center m-top15">'+
                        '<div class="col-md-6 col-sm-6 col-xs-6">'+                                                            
                            '<a href="" class="cl-black extraer_leads" data-toggle="modal" data-id="extraer_'+campaings[i]['campaing_id']+'" >'+
                                '<img src="'+base_url+'assets/img/down.png'+'" alt="">'+
                                    '<span class="fleft100 ft-size11 m-top8 fw-600">'+T('Extrair leads',language)+'</span>'+
                                    '</a>'+
                            '</div>'+
                            '<div class="col-md-6 col-sm-6 col-xs-6">';                                    
                            if(campaings[i]['campaing_status_id_string'] != "CANCELADA"){                                    
                                html += '<div id="edit_campaing_'+campaings[i]['campaing_id']+'">'+
                                        '<a href="" class="cl-black edit_campaing" data-toggle="modal" data-id="editar_'+campaings[i]['campaing_id']+'" >'+
                                            '<img src="'+base_url+'assets/img/editar.png'+'" alt="">'+
                                                '<span class="fleft100 ft-size11 m-top8 fw-600">'+T('Editar',language)+'</span>'+
                                        '</a>'+
                                        '</div>';
                                }                            
            html += '</div></div> </div>';
    }
    
    document.getElementById('total_capt').innerHTML = total_capt;  
    document.getElementById('total_gast').innerHTML = Number(total_capt*price_lead/100).toFixed(2);  
    
    return html;
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

function  validaCPF(cpf) {        
    
        if(!cpf) 
            return false;         
        if (cpf.length !== 11){
            return false;    
        }
        else{ 
            if (cpf === '00000000000' || 
                cpf === '11111111111' || cpf === '22222222222' || cpf === '33333333333' || 
                cpf === '44444444444' || cpf === '55555555555' || cpf === '66666666666' || 
                cpf === '77777777777' || cpf === '88888888888' || cpf === '99999999999') {
                return false;
            } 
            else {  
                var t,d,c;
                for (t = 9; t < 11; t++) {
                    for (d = 0, c = 0; c < t; c++) {
                        d += cpf[c] * ((t + 1) - c);
                    }
                    d = ((10 * d) % 11) % 10;
                    if (cpf[c] != d) {
                        return false;
                    }
                }
                return true;
            }
        }
    }

function validaCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

$(function() {
    // Solo numeros con coma o sin coma en lo que gastara por dia
    var i = $('#daily_value');
    i.keydown(function(ev) {
        var permittedChars = /[0-9\.,]/;
        var v = ev.target.value;
        var k = ev.originalEvent.key;
        var c = ev.originalEvent.keyCode.toString();
        var ctrlKeys = /^(8|35|36|37|38|39|40|46)$/; // delete, backspace, left, right...
        if (k.match(permittedChars)===null && c.match(ctrlKeys)===null) {
            ev.originalEvent.preventDefault();
            return;
        }
        if (k === '.' && v.indexOf('.') !== -1) {
            ev.originalEvent.preventDefault();
            return;
        }
        if (v.length === 7 && c.match(ctrlKeys)===null) {
            ev.originalEvent.preventDefault();
            return;
        }
    });
    var i2 = $('#edit_daily_value');
    i2.keydown(function(ev) {
        var permittedChars = /[0-9\.,]/;
        var v = ev.target.value;
        var k = ev.originalEvent.key;
        var c = ev.originalEvent.keyCode.toString();
        var ctrlKeys = /^(8|35|36|37|38|39|40|46)$/; // delete, backspace, left, right...
        if (k.match(permittedChars)===null && c.match(ctrlKeys)===null) {
            ev.originalEvent.preventDefault();
            return;
        }
        if (k === '.' && v.indexOf('.') !== -1) {
            ev.originalEvent.preventDefault();
            return;
        }
        if (v.length === 7 && c.match(ctrlKeys)===null) {
            ev.originalEvent.preventDefault();
            return;
        }
    });
    // Tarjeta de credito
    //$('#credit_card_number').mask('999.999.999-99', { placeholder: ' ' });
    //$('#credit_card_cvc').mask('***/***', { placeholder: ' ' });
});
