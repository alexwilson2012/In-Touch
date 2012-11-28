<?php

$_POST['comments'] = str_replace('"', '\"', $_POST['comments']);
$_POST['comments'] = str_replace("'", "\'", $_POST['comments']);

// Execute python script on command line
echo exec('python comment_email.py "'.$_POST['email'].'" "'.$_POST['name'].'" "'.$_POST['comments'] . '"');

// Send confirmation message back to the user
echo 'Thanks for sending us your feedback!';

?>