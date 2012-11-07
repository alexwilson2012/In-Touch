<?php

$to      = 'AlexWilson2012@u.northwestern.edu';
$subject = 'the subject';
$message = 'hello';
$headers = 'From: AlexWilson2012@u.northwestern.edu' . "\r\n" .
    'Reply-To: AlexWilson2012@u.northwestern.edu' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);

echo 'hi';

?>