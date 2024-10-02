<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = trim($_POST["message"]);
    $sendCopy = isset($_POST["sendCopy"]);

    $email_subject = "New Contact Form Submission";
    $email_body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";
    $headers = "From: $email\n";

    // Send email to the specified email address
    if(mail("ashhad4u@gmail.com", $email_subject, $email_body, $headers)) {
        if ($sendCopy) {
            $headers = "From: no-reply@yourdomain.com\n";
            mail($email, "Copy of Your Message to Not Diamond", $email_body, $headers);
        }
        echo "success"; // This will be sent back to the JavaScript
    } else {
        echo "error"; // In case the mail function fails
    }
}
?>