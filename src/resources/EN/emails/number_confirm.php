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
                <h1 style="text-align:center;">Account confirmation!</h1>
            </div> 
            <div ><p><h3>Hi <strong><?php echo $_GET["username"]; ?></strong>,</h3></p></div>
            <p> You just made the first step to register in Dumbu system, congratulations! :D</p>
            <p> Please use the following 4-digit code to continue your registration:</p>
                
            <h2><?php echo $_GET["number"]; ?></h2>
            <br>
            <p>If you have any questions, please write to us!</p>
            <p>Thank you for using our services,</p>
            <p>DUMBU SYSTEM</p>
        </div>
    </body>
</html>
