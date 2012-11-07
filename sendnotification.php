<?php

$to      = 'AlexWilson2012@u.northwestern.edu';
$subject = 'TakeControl - Notification';
$message = 'Alex has arrived at Latitude ' . $_POST['Latitude'] . ', and Longitude ' . $_POST['Longitude'] . '. Unfamiliar with this location? Here\'s a map.';
$headers = 'From: AlexWilson2012@u.northwestern.edu' . "\r\n" .
    'Reply-To: AlexWilson2012@u.northwestern.edu' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);

echo 'We have notified ' . $to . ' that you have arrived!';

?>