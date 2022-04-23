<?php

$EmailFrom = "info@loyica.com";
$EmailTo = "info@loyica.com";
$Subject = "Start Project Query From WebForm";
$Name = Trim(stripslashes($_POST['Name'])); 
$Tel = Trim(stripslashes($_POST['Tel'])); 
$Email = Trim(stripslashes($_POST['Email'])); 
$Message = Trim(stripslashes($_POST['Message'])); 

// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $Name2;
$Body .= "\n";
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email2;
$Body .= "\n";
$Body .= "\n";
$Body .= "Tel: ";
$Body .= $Tel;
$Body .= "\n";
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message2;
$Body .= "\n";
$Body .= "\n";
$Body .= "\n";
$Body .= "\n";
$Body .= "This email has been generated from Start Project Form - www.loyica.com";

// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=thanks.html\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=sorry.html\">";
}
?>