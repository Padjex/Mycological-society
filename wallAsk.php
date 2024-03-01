<?php session_start() ?>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html" ; charset="utf-8" />
    <title>МД Дивчибаре - Детерминација</title>
    <link rel="stylesheet" href="css/all.min.css" />
    <link rel="stylesheet" href="css/wallAsk/main-style.css" />
    <link rel="stylesheet" href="css/home/header-style.css" />
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1"> -->
</head>

<body>
    <div id="rotate">
        <?php include "php/header.php" ?>
        <?php include "php/navbar1.php" ?>
        <main>
            <!-- Left bar -->
            <?php include "php/wall/leftbar.php" ?>
            <!-- wall -->
            <?php include "php/wall/wall.php" ?>
            <!-- Right bar -->
            <?php include "php/wall/rightbar.php" ?>
        </main>
        <?php include "php/wall/slider.php" ?>
        <?php
        if (isset($_SESSION['adminID'])) {
            include "php/wall/determination.php";
        }
        if (isset($_SESSION['userID']) || isset($_SESSION['adminID'])) {
            echo '<div class="com-change-div">
                    <i title="измени" class="fa-solid fa-pen com-change-btn"></i>
                    <div class="com-change-st"></div>
                    <i title="обриши" class="fa-solid fa-eraser com-delete-btn"></i>
                  </div>';
        }

        ?>
    </div>
    <script src="js/wallAsk/animation.js"></script>
    <script src="js/wallAsk/function.js"></script>
    <?php
    if (isset($_SESSION['userID'])) {
        echo '<script src="js/logIn.js"></script>';
        echo '<script src="js/wallAsk/uploadImg.js"></script>';
        echo '<script>
        sessionStorage.setItem("userID","' . $_SESSION["userID"] . '");
        sessionStorage.setItem("fname","' . $_SESSION["firstname"] . '");
        sessionStorage.setItem("lname","' . $_SESSION["lastname"] . '");
        sessionStorage.setItem("member","' . $_SESSION["member"] . '");
    </script>';
    } elseif (isset($_SESSION['adminID'])) {
        echo '<script src="js/logIn.js"></script>';
        echo '<script src="js/wallAsk/uploadImg.js"></script>';
        echo '<script>
        sessionStorage.setItem("adminID","' . $_SESSION["adminID"] . '");
        sessionStorage.setItem("fname","' . $_SESSION["firstname"] . '");
        sessionStorage.setItem("lname","' . $_SESSION["lastname"] . '");
        sessionStorage.setItem("title","' . $_SESSION["title"] . '");
    </script>';
    } else {
        echo '<script src="js/logOut.js"></script>';
    }
    ?>
</body>

</html>