<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Ticket generated successfully!</title>
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
                
                <h1 style="text-align:center;">Ticket generated successfully! </h1>
                
            </div>
            <div ><p><h3>Hi <strong><?php echo $_GET["username"]; ?></strong>,</h3></p></div>
            <p> Your ticket has been successfully generated!</p>
            <p> Download the ticket bank by clicking
                <a href="<?php echo $_GET["ticket_url"]; ?>">HERE</a>,
                and make the payment as soon as possible so you can get your leads!
            </p>
            
            <p>Thank you for using our services,</p>
            <p>DUMBU SYSTEM</p>
        </div>
    </body>
</html>
