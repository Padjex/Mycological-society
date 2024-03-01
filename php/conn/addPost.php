<?php
session_start();
include "connection.php";
if ($_GET['text'] != null) {
    if (isset($_FILES['file']['name'])) {
        $req1 = "SELECT MAX(post_id) as 'index' FROM post";
        $rez1 = $mysql->query($req1);
        foreach ($rez1 as $row) {
            if ($row['index'] == null) {
                $indexFolder = 1;
            } else {
                $indexFolder = $row['index'] + 1;
            }
        }
        $numberOfImgs = 0;
        $checkNumberOfImgs = 0;

        $location = "../../img/posts/post" . $indexFolder;
        if (!mkdir($location, 0777, true)) {
            die("false");
        }
        $validExtenstion = array('jpg', 'jpeg', 'png');
        foreach ($_FILES['file']['name'] as $file) {
            $fileName = $_FILES['file']['name'][$numberOfImgs];
            $extension = pathinfo($fileName, PATHINFO_EXTENSION);
            $extension = strtolower($extension);

            if (in_array($extension, $validExtenstion)) {
                $location = "../../img/posts/post" . $indexFolder;
                $_FILES['file']['name'][$numberOfImgs] = "img" . $numberOfImgs . ".jpg";
                $fileName = $_FILES['file']['name'][$numberOfImgs];
                $location = $location . "/" . $fileName;
                move_uploaded_file($_FILES['file']['tmp_name'][$numberOfImgs], $location);
                $checkNumberOfImgs++;
            }
            $numberOfImgs++;
        }

        // check imgs if ok?
        $location = "../../img/posts/post" . $indexFolder;
        if ($checkNumberOfImgs == $numberOfImgs) {
            $text = $_GET['text'];
            if (isset($_SESSION['adminID'])) {
                $id = $_SESSION['adminID'];
                $req2 = "INSERT INTO post(post_id,admin_id,img_location,text) values ('$indexFolder','$id','$location','$text')";
            } elseif (isset($_SESSION['userID'])) {
                $id = $_SESSION['userID'];
                $req2 = "INSERT INTO post(post_id,user_id,img_location,text) values ('$indexFolder','$id','$location','$text')";
            }
            if ($mysql->query($req2)) {
                echo "success";
            } else {
                $imgs = glob($location . "/*");
                foreach ($imgs as $img) {
                    unlink($img);
                }
                rmdir($location);
                echo "error";
            }
        } else {
            $imgs = glob($location . "/*");
            foreach ($imgs as $img) {
                unlink($img);
            }
            rmdir($location);
            echo "errorImg";
        }
    }
} else {
    echo "needText";
}