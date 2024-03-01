<?php
session_start();
if (isset($_SESSION['adminID']) or isset($_SESSION['userID'])) {
    include "connection.php";
    $id = file_get_contents("php://input");
    $req = "DELETE FROM POST WHERE post_id like '$id'";
    if ($mysql->query($req)) {
        echo "success";
        $location = "../../img/posts/post" . $id;
        $imgs = glob($location . "/*");
        foreach ($imgs as $img) {
            unlink($img);
        }
        rmdir($location);
    } else {
        echo "error";
    }
} else {
    header("location: ../../library.php");
}