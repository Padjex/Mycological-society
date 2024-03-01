<?php
$pass = "";
$em = "";
include "connection.php";

if (isset($_POST['btnLog'])) {
    $pass = $_POST['passwordLog'];
    $em = $_POST["emailLog"];

    $req = "SELECT * FROM user WHERE email LIKE '$em'";
    $rez = $mysql->query($req);
    $ch = 0;
    foreach ($rez as $row) {
        $fname = $row['firstname'];
        $lname = $row['lastname'];
        $passR = $row['password'];
        $id = $row['user_id'];
        $member = $row['member'];
        $ch++;
    }
    if ($ch == 0) {
        header("location: ../../logIn.php?error=noUser");
    } else {
        if ($pass == $passR) {
            session_start();
            $_SESSION['firstname'] = $fname;
            $_SESSION['lastname'] = $lname;
            $_SESSION['userID'] = $id;
            $_SESSION['member'] = $member;
            header("location: ../../myProfile.php?logIn=true");
        } else {
            header("location: ../../logIn.php?error=passX");
        }
    }
} else {
    header("location: ../../logIn.php");
}