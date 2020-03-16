<?php

$from = Trim(stripslashes($_POST['noreply@apex-pak.com'])); 
$EmailTo = "info@apex-pak.com";
$Subject = "Customer Email Message";
$Fname = Trim(stripslashes($_POST['name'])); 
$Email = Trim(stripslashes($_POST['email'])); 
$Mobile = Trim(stripslashes($_POST['phone']));
$message_type = Trim(stripslashes($_POST['type'])); 
$Message = Trim(stripslashes($_POST['comment'])); 

// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=..\error.htm\">";
  exit;
}

$userip = ($_SERVER['X_FORWARDED_FOR']) ? $_SERVER['X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'];

$Body = "";
$Body .= "First Name: "; $Body .= $Fname; $Body .= "\n";
$Body .= "Email: "; $Body .= $Email; $Body .= "\n";
$Body .= "Mobile: "; $Body .= $Mobile; $Body .= "\n";
$Body .= "Message Type: "; $Body .= $message_type; $Body .= "\n";
$Body .= "Message: "; $Body .= $Message; $Body .= "\n";

$Body .= "User's IP: ". $userip;

// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$from>", $from);

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=..\index.html\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=..\error.htm\">";
}
?>
