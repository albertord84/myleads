<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>DUMBU Number Verification</title>
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
                <h1 style="text-align:center;">Confirmación de cuenta!</h1>
            </div> 
            <div ><p><h3>Hola <strong><?php echo $_GET["username"]; ?></strong>,</h3></p></div>
            <p> Acabas de dar el primer paso para registrarte en el sistema Dumbu, ¡Enhorabuena! :D</p>
            <p> Utilice el siguiente código de 4 dígitos para continuar su registro:</p>
                
            <h2><?php echo $_GET["number"]; ?></h2>
            <br>
            <p>Si tiene alguna duda, ¡escríbanos!</p>
            <p>Gracias por usar nuestros servicios,</p>
            <p>DUMBU SYSTEM</p>
        </div>
    </body>
</html>
