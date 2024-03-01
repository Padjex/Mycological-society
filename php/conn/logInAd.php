<?php
include "connection.php";
$check = isset($_GET['p']) ? $_GET['p'] : '';
if ($check == "da") {
    $data = file_get_contents("php://input");
    $data = json_decode($data, true);
    $em = $data['em'];
    $pass = $data['pass'];
    $req = "SELECT * FROM admin WHERE email LIKE '$em'";
    $rez = $mysql->query($req);
    $ch = 0;
    foreach ($rez as $row) {
        $fname = $row['firstname'];
        $lname = $row['lastname'];
        $passR = $row['password'];
        $id = $row['admin_id'];
        $title = $row['title'];
        $ch++;
    }
    if ($ch == 0) {
        echo "error";
    } else {
        if ($pass == $passR) {
            session_start();
            $_SESSION['firstname'] = $fname;
            $_SESSION['lastname'] = $lname;
            $_SESSION['adminID'] = $id;
            $_SESSION['title'] = $title;
            $_SESSION['admin'] = true;
            echo "success";
        } else {
            echo "error";
        }
    }
} else {
    header("location: ../../index.php");
}