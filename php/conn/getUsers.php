<?php
session_start();
include "connection.php";
if (isset($_SESSION['adminID'])) {
    $req = "SELECT firstname, lastname, user_id, member from user";
    $rez = $mysql->query($req);
    $users = array();
    $index = 0;

    foreach ($rez as $row) {
        $users[$index] = [
            "fname" => $row['firstname'],
            "lname" => $row['lastname'],
            "id" => $row['user_id'],
            "member" => $row['member']
        ];
        $index++;
    }
    echo json_encode($users);
} else {
    header("location: ../../logIn.php");
}