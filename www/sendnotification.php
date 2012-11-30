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


// http://localhost/~IrsalAlsanea/Sites/sendnotification.php?Latitude=42.123213&Longitude=82.123213&email=ijas@u.northwestern.edu&email2=irsalalsanea2014@u.northwestern.edu&name=irsal&parent_name=belle&preset_locaiton=&phone_email=&phone_email2=7085436166@messaging.sprintpcs.com

?>