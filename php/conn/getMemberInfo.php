<?php
session_start();
include "connection.php";
if (isset($_SESSION['userID'])) {
    $id = $_SESSION['userID'];
    $req = "SELECT * FROM user WHERE user_id like '$id'";
    $rez = $mysql->query($req);
    foreach ($rez as $row) {
        $data = [
            "fname" => $row['firstname'],
            'lname' => $row['lastname'],
            'email' => $row['email'],
            'date' => $row['dateMember'],
            'mem' => $row['member'],
        ];
    }

    $req2 = "SELECT favoritemus.name_sp,favoritemus.name_fm,musspecies.main_imgs from favoritemus inner join musspecies on favoritemus.name_sp=musspecies.name and favoritemus.name_fm=musspecies.familyName where favoritemus.user_id = '$id'";
    $rez2 = $mysql->query($req2);
    $data2 = array();
    $index = 0;
    foreach ($rez2 as $row) {
        $data2[$index] = [
            "sp" => $row["name_sp"],
            "fn" => $row['name_fm'],
            "img" => $row['main_imgs']
        ];
        $index++;
    }
    echo json_encode(array($data, $data2));
} else {
    header("location: ../../logIn.php");
}