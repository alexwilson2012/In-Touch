<?php

// Execute python script on command line
echo exec('python send_email.py '.$_POST['email'].' '.$_POST['Latitude'].' '.$_POST['Longitude']);

// Send confirmation message back to the user
echo 'We have notified ' . $_POST['email'] . ' that you have arrived!';

?>