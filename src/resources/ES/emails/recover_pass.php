<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>DUMBU Recover pass</title>
	<style>
	div.violet {
	    background-color: #400080;
	    color: white;
	}
	</style>
    </head>
    <body>
        <div style="width: 640px; font-family: Arial, Helvetica, sans-serif; font-size: 11px;">
            <div class = "violet" style="padding:24px 16px">
                <p style="text-align:center;">
                    <img src='cid:logo_confirm' style="vertical-align:middle">
                </p>                
                <h1 style="text-align:center;">Recuperación de contraseña</h1>
            </div>    
            <div ><p><h3>Hola <strong><?php echo $_GET["username"]; ?>!</strong></h3></p></div>
            <p> Por favor, haga clic en el siguiente enlace para restablecer su contraseña en nuestro sitema: </p>
<!--            <a href="<?php // echo 'https://dumbu.pro/leads/src/index.php/welcome/password_recovery?language=PT&token='.$_GET["token"]; ?>">
                <?php // echo 'https://dumbu.pro/leads/src/index.php/welcome/password_recovery?language=PT&token='.$_GET["token"]; ?>
            </a> -->
            <a href="<?php echo 'https://dumbu.pro/leads/src/index.php/welcome/password_recovery?language=ES&token='.$_GET["token"].'&login='.$_GET["username"]; ?>">
                <?php echo 'https://dumbu.pro/leads/src/index.php/welcome/password_recovery?language=ES&token='.$_GET["token"].'&login='.$_GET["username"]; ?>
            </a> 
            <br>
            <p>Si tiene alguna duda, ¡solo escríbanos!</p>
            <br>
            <p>Gracias por usar nuestros servicios,</p>
            <p>DUMBU SYSTEM</p>
        </div>
    </body>
</html>
