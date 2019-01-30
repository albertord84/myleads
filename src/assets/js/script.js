$(document).ready(function(){
	/////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////
	// MASCARAS DO SITE
	$('.fone').mask('(99) 9999-9999?9');
	$('.data').mask('99/99/9999');
	$('.cpf').mask('999.999.999-99');
        $('.cnpj').mask('99.999.999/9999-99');
        $('.cep').mask('99999-999');        
});

$('#filtro').multiselect({
    templates:{
        button: '<button type="button" class="multiselect dropdown-toggle b-none bk-none btn-filtrar" data-toggle="dropdown"  data-placement="bottom">Filtrar por data</button>'
    },
});

/*$('#datetimepicker').datepicker({
    format: "dd/mm/yyyy",
    //language: "pt-BR",    
    autoclose: true
});
$('#datetimepicker2').datepicker({
    format: "dd/mm/yyyy",
    //language: "pt-BR",
    autoclose: true
});*/

/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// ANCORA DESLIZANTE

var $doc = $('html, body');
$('.deslize').click(function() {
    $doc.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});

$(document).ready(function(){
  $('.cartao').click(function() {
    if(!$("#pago_cartao").hasClass('ativo')){
        $('.blt').toggle("hide");
        $('.ctr').toggle("slow");
        $('.cartao').addClass("ativo");
        $('.boleto').removeClass("ativo");
    }
  });
  $('.boleto').click(function() {
    if(!$("#pago_boleto").hasClass('ativo')){
        $('.blt').toggle("slow");
        $('.ctr').toggle("hide");
        $('.cartao').removeClass("ativo");
        $('.boleto').addClass("ativo");
    }
  });
  $('.cl').click(function() {
    $('.menu_btn').removeClass("hover");    
  });
  $('.bt-cal').click(function() {
    $('.menu_btn').removeClass("hover");    
  });
});

$(document).ready(function () {
    $(".person").click(function (e) {
        $('.dropfiltro').removeClass("open");
        $('.menu_btn').closest('.menu_btn').toggleClass("hover");
        e.stopPropagation();
    });
    $(document).on('click', function (e) {    
        if (!$(e.target).closest('.hover').length) $('.menu_btn').removeClass("hover");
    });
    
    
});

$(function() {            
    $( '#dl-menu' ).dlmenu({
        animationClasses : { classin : 'dl-animate-in-4', classout : 'dl-animate-out-4' }
    });
    $( ".ancora-mobile" ).on( "click", function() {
        $( "#dl-menu" ).removeClass("bg-menu-mobile");
        $( ".dl-menu" ).removeClass( 'dl-menuopen' );
        $( ".dl-menu" ).addClass( 'dl-menu-toggle' );
        $( ".dl-trigger" ).removeClass( 'dl-active' );
    });
});