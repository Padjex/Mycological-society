<?php
session_start();
include "connection.php";
if (isset($_SESSION['adminID'])) {
    $id = $_SESSION['adminID'];
    $req = "SELECT * FROM admin where admin_id like '$id'";
    $rez = $mysql->query($req);

    $req2 = "SELECT COUNT(*) as 'detNum' FROM determination where admin_id like '$id'";
    $rez2 =  $mysql->query($req2);

    foreach ($rez2 as $row) {
        $detNum = $row['detNum'];
    }


    foreach ($rez as $row) {
        $data = [
            "fname" => $row['firstname'],
            'lname' => $row['lastname'],
            'email' => $row['email'],
            'title' => $row['title'],
            'date' => $row['dateMember'],
            'img' => $row['img'],
            "detNum" => $detNum
        ];
    }
    echo json_encode($data);
} else {
    header("location: ../../logIn.php");
}