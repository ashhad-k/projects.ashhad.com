<?php
$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get POST data
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';
    $sendCopy = isset($_POST['sendCopy']) ? true : false;

    // Validate form fields
    if (empty($name)) {
        $errors[] = 'Name is empty';
    }

    if (empty($email)) {
        $errors[] = 'Email is empty';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email is invalid';
    }

    if (empty($phone)) {
        $errors[] = 'Phone number is empty';
    }

    if (empty($message)) {
        $errors[] = 'Message is empty';
    }

    // If no errors, send email
    if (empty($errors)) {
        // Recipient email address (replace with your own)
        $recipient = "ashhad4u@gmail.com";

        // Email subject
        $subject = "New Contact Form Submission";

        // Email content
        $emailContent = "Name: $name\n";
        $emailContent .= "Email: $email\n";
        $emailContent .= "Phone: $phone\n";
        $emailContent .= "Message:\n$message\n";

        // Additional headers
        $headers = "From: $name <$email>";

        // Send email
        if (mail($recipient, $subject, $emailContent, $headers)) {
            // Send a copy to the user if requested
            if ($sendCopy) {
                mail($email, $subject, $emailContent, $headers);
            }
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again later.']);
        }
    } else {
        // Display errors
        echo json_encode(['success' => false, 'errors' => $errors]);
    }
} else {
    // Not a POST request, display a 403 forbidden error
    header("HTTP/1.1 403 Forbidden");
    echo "You are not allowed to access this page.";
}
?>
