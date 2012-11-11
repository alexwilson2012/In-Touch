<?php

// Execute python script on command line
echo exec('python send_email.py '.$_POST['email'].' '.$_POST['Latitude'].' '.$_POST['Longitude'].' '.$_POST['name']);

// Send confirmation message back to the user
echo 'Hi,' . $_POST['name'] . '. We have notified ' . $_POST['email'] . ' that you have arrived!';

?>