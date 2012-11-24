<?php

// echo $_POST['unique_id'];
// echo "<br>";
// echo $_POST['parent_email'];

echo exec('python send_unique_email.py '.$_POST['parent_email'].' '.$_POST['unique_id']);

?>