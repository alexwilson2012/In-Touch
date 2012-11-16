<?php

// Execute python script on command line

if($_POST['phone_email'] == '')
{
echo exec('python send_email.py '.$_POST['email'].' '.$_POST['Latitude'].' '.$_POST['Longitude'].' "'.$_POST['name'].'" "'.$_POST['preset_location'].'"');
}
else
{
echo exec('python send_email.py '.$_POST['phone_email'].' '.$_POST['Latitude'].' '.$_POST['Longitude'].' "'.$_POST['name'].'" "'.$_POST['preset_location'].'"');
}

// Send confirmation message back to the user
if($_POST['preset_location'] == '')
{
	echo 'Hi, ' . $_POST['name'] . '. We have notified ' . $_POST['phone_email'] . ' that you have arrived!';
}
else
{
	echo 'Hi, ' . $_POST['name'] . '. We have notified ' . $_POST['email'] . ' that you have arrived at '.$_POST['preset_location'].'!';
}

?>