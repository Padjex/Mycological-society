<?php session_start() ?>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html" ; charset="utf-8" />
    <link rel="stylesheet" href="css/all.min.css" />
    <link rel="stylesheet" href="css/library/header-style.css" />
    <link rel="stylesheet" href="css/library/sidebar-style.css" />
    <link rel="stylesheet" href="css/library/main-style1.css" />
    <link rel="stylesheet" href="css/library//main-style2.css" />
</head>

<body onload="startInterval()">

    <?php include "php/header.php" ?>
    <?php include "php/navbar2.php" ?>
    <!-- End of header -->
    <?php include "php/sidebar.php" ?>
    <?php include "php/library/main1.php" ?>
    <?php include "php/library/main2.php" ?>
    <script src="js/library/animation.js"></script>
    <script src="js/library/function.js"></script>
    <?php
    if (isset($_SESSION['userID']) || isset($_SESSION['adminID'])) {
        echo '<script src="js/logIn.js"></script>';
    } else {
        echo '<script src="js/logOut.js"></script>';
    }
    ?>
</body>

</html>