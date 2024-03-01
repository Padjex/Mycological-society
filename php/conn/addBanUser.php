<?php
include "connection.php";
$id = file_get_contents("php://input");
if (isset($id)) {
    if ($_GET['addMem'] == "false") {
        $req = "DELETE from user where user_id like '$id'";
    } else {
        $req = "UPDATE user set member = 'da' where user_id like '$id'";
    }
    if ($mysql->query($req)) {
        echo "true";
    } else {
        echo "false";
    }
} else {
    header("location: ../../library.php");
}