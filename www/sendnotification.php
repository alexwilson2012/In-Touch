<?php

// Send confirmation message back to the user
if($_POST['preset_location'] == '')
{
	echo 'Hi, ' . $_POST['name'] . '. We have notified ' . $_POST['parent_name'] . 'and' . $_POST['parent_name2'] . ' that you are at '.$_POST['address'].'!';
	$location_name = $_POST['address'];
}
else
{
	echo 'Hi, ' . $_POST['name'] . '. We have notified ' . $_POST['parent_name'] . 'and' . $_POST['parent_name2'] . ' that you are at '.$_POST['preset_location'].'!';
	$location_name = $_POST['preset_location'];
}

// Execute python script on command line
// Parent 1
if($_POST['phone_email'] == '')
{
	echo exec('python send_email.py '.$_POST['email'].' '.$_POST['Latitude'].' '.$_POST['Longitude'].' "'.$_POST['name'].'" "'.$location_name.'"');
}
else
{
	echo exec('python send_email.py '.$_POST['phone_email'].' '.$_POST['Latitude'].' '.$_POST['Longitude'].' "'.$_POST['name'].'" "'.$location_name.'"');
}

// Parent 2
if($_POST['phone_email2'] == '')
{
	echo exec('python send_email.py '.$_POST['email2'].' '.$_POST['Latitude'].' '.$_POST['Longitude'].' "'.$_POST['name'].'" "'.$location_name.'"');
}
else
{
	echo exec('python send_email.py '.$_POST['phone_email2'].' '.$_POST['Latitude'].' '.$_POST['Longitude'].' "'.$_POST['name'].'" "'.$location_name.'"');
}

?>