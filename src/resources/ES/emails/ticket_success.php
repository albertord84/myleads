<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Boleto generado con éxito!</title>
	<style>
	div.green {
	    background-color: #00b359;
	    color: white;
	}
	</style>
    </head>
    <body>
        <div style="width: 640px; font-family: Arial, Helvetica, sans-serif; font-size: 11px;">
            <div class = "green" style="padding:24px 16px">
                <p style="text-align:center;">
                    <img src='cid:logo_boleto'  style="vertical-align:middle">
                </p>
                
                <h1 style="text-align:center;">Boleto generado con éxito! </h1>
                
            </div>
            <div ><p><h3>Hola <strong><?php echo $_GET["username"]; ?></strong>,</h3></p></div>
            <p> ¡Su boleto ha sido generado exitosamente!</p>
            <p> Descargue su boleto bancario haciendo clic
                <a href="<?php echo $_GET["ticket_url"]; ?>">AQUI</a>,
                y realice el pago lo antes posible para que pueda obtener sus leads!
            </p>
            
            <p>Gracias por usar nuestros servicios,</p>
            <p>DUMBU SYSTEM</p>
        </div>
    </body>
</html>
