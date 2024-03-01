<?php
// doesn't work??
if (isset($_SESSION['userID'])) {
    header("location: myProfile.php");
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>МД Дивчибаре - Почетна</title>
    <meta http-equiv="Content-Type" content="text/html" ; charset="utf-8" />
    <link rel="stylesheet" href="css/all.min.css" />
    <link rel="stylesheet" href="css/home/header-style.css" />
    <link rel="stylesheet" href="css/home/main-style.css" />
    <link rel="stylesheet" href="css/home/footer-style.css" />
    <!-- <link rel="stylesheet" href="css/pocetna/forAnimation.css" /> -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>

<body>
    <!-- Animation on load - need to repair -->
    <!-- <div class="animationMush"></div>
    <div class="animation-div11 animation-divs"></div>
    <div class="animation-div12 animation-divs"></div>
    <div class="animation-div21 animation-divs"></div>
    <div class="animation-div22 animation-divs"></div>
    <div class="animation-div31 animation-divs"></div>
    <div class="animation-div32 animation-divs"></div>

    <div class="animation-div42 animation-divs"></div>
    <div class="animation-div51 animation-divs"></div>
    <div class="animation-div52 animation-divs"></div>
    <div class="animation-div61 animation-divs"></div>
    <div class="animation-div62 animation-divs"></div>
    <audio id="sound">
      <source src="sound/windSound.mp3" type="audio/mp3" />
    </audio> -->
    <?php include "php/header.php" ?>
    <?php include "php/navbar1.php" ?>
    <main>
        <!-- SECTION 1 -->
        <?php include "php/home/sec1.php" ?>
        <!-- SECTION 2 -->
        <?php include "php/home/sec2.php" ?>
        <!-- SECTION 3 -->
        <?php include "php/home/sec3.php" ?>
    </main>

    <!--SingIn SECTION-->
    <?php include "php/home/singIn.php" ?>
    <?php include "php/footer.php" ?>
    <script src="js/pocetna/animation.js"></script>
    <script src="js/pocetna/conn.js"></script>
</body>

</html>