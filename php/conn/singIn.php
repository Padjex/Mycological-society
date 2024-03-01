<?php
include "connection.php";
$check = isset($_GET['p']) ? $_GET['p'] : '';
if ($check == "singIn") {
    $data = file_get_contents("php://input");
    $data = json_decode($data, true);
    $fname = $data['fname'];
    $lname = $data['lname'];
    $email = $data['email'];
    $pass = $data['password'];



    $req = "INSERT INTO user (firstname,lastname,email,password) values ('$fname','$lname','$email','$pass')";

    if ($mysql->query($req) === true) {
        echo "true";
    } elseif (strpos($mysql->error, 'Duplicate entry') !== false) {
        echo "duplicateEmail";
    } else {
        echo $mysql->error;
    }
} else {
    header("location: ../../index.php");
}