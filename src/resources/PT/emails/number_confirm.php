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
                <h1 style="text-align:center;">Confirmação de conta!</h1>
            </div>    
            <div ><p><h3>Olá <strong><?php echo $_GET["username"]; ?></strong>,</h3></p></div>
            <p> Você acaba de fazer o primeiro passo para se cadastrar no sistema Dumbu, parabéns! :D</p>
            <p> Por favor, utilize o seguinte código de 4 dígitos para continuar o seu cadastro:</p>
                
            <h2><?php echo $_GET["number"]; ?></h2>
            <br>
            <p>Se tiver qualquer dúvida, por favor nos escreva!</p>
            <p>Obrigado por usar nossos serviços,</p>
            <p>DUMBU SYSTEM</p>
        </div>
    </body>
</html>
