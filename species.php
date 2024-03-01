<?php session_start() ?>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html" ; charset="utf-8" />
    <link rel="stylesheet" href="css/all.min.css" />
    <link rel="stylesheet" href="css/library/header-style.css" />
    <link rel="stylesheet" href="css/library/sidebar-style.css" />
    <link rel="stylesheet" href="css/species/main-style.css" />
</head>

<body>
    <?php include "php/header.php" ?>
    <?php include "php/navbar2.php" ?>
    <!-- End of header -->
    <?php include "php/sidebar.php" ?>

    <main class="main-st">
        <?php include "php/species/section1.php" ?>
        <?php include "php/species/section2.php" ?>
        <?php include "php/species/section3.php" ?>
    </main>
    <script src="js/sprecies/animtaion.js"></script>
    <script src="js/sprecies/function.js"></script>
    <?php
    if (isset($_SESSION['userID']) || isset($_SESSION['adminID'])) {
        echo '<script src="js/logIn.js"></script>';
    } else {
        echo '<script src="js/logOut.js"></script>';
    }
    ?>
</body>

</html>