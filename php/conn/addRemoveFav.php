<?php
include "connection.php";
$check = $_GET['fav'];

if ($check) {
    $data = file_get_contents('php://input');
    $data = json_decode($data, true);
    $id = $data['id'];
    $fn = $data['fn'];
    $sp = $data['sp'];
    if ($check == "true") {
        $req = "DELETE FROM favoritemus where user_id like '$id' and name_sp like '$sp' and name_fm like '$fn'";
    } elseif ($check == "false") {
        $req = "INSERT INTO favoritemus (user_id,name_sp,name_fm) VALUES ('$id','$sp','$fn')";
    }

    if ($mysql->query($req)) {
        echo "true";
    } else {
        echo "error";
    }
} else {
    header("location: ../../library.php");
}