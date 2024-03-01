<?php session_start(); ?>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html" ; charset="utf-8" />
    <link rel="stylesheet" href="css/all.min.css" />
    <link rel="stylesheet" href="css/home/header-style.css" />
    <link rel="stylesheet" href="css/myProf/main.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>

<body>
    <?php include "php/header.php" ?>
    <?php include "php/navbar1.php" ?>
    <!-- main -->
    <main>
        <!-- profile container -->
        <div class="profile-con">
            <div class="user-Img">
                <div class="btn-set-Img">
                    <p>Додај слику</p>
                </div>
            </div>
            <div class="user-info-con">
                <p>Име:</p>
                <p class="user-name p-info"></p>
                <p>Презиме:</p>
                <p class="user-lname p-info"></p>
                <p>е-адреса:</p>
                <p class="e-adresa p-info"></p>
                <p class="admin-date">Члан сајта од:</p>
                <p class="member-date p-info"></p>
                <?php
                if (isset($_SESSION["userID"])) {
                    echo ' 
                <p>Члан друштва:</p>
                <p class="member-of-group p-info"></p>';
                }
                ?>
                <button class="btn-change">Промени лозинку</button>
            </div>
        </div>
        <div class="myFavorites-con">
            <?php if (isset($_SESSION['userID'])) {
                echo '
            <h2>Омиљене врсте</h2>
            <div class="list-con">
                <ul class="list-favorites">
                    <li class="favorite-li" style="display: none;">
                        <div class="img-favorite"></div>
                        <div class="mus-name-div">
                            <h3 class="fm-name"></h3>
                            <h3 class="sp-name"></h3>
                        </div>
                        <i class="fa-solid fa-2x fa-circle-xmark btn-delete"></i>
                    </li>
                </ul>
            </div>';
            } elseif (isset($_SESSION['adminID'])) {
                echo '<h3 class="admin-title info-admin">Звање: </h3>
                <h3 class="det-num info-admin">Број детерминација: </h3>
                <div class="member-of-site-div">
                    <h3>Чланови сајта:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th class="id-column">ИД</td>
                                <th class="name-column">Име и презиме</td>
                                <th class="action-column">Акција</td>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>';
            }
            ?>

        </div>
        <div class="myFounds-con">
            <h2>Историја проналазака</h2>
            <ul class="list-founds">
                Нисте још додали омиљене врсте...
            </ul>
        </div>
    </main>
    <?php
    if (isset($_SESSION['userID'])) {
        echo '<script>
                sessionStorage.setItem("userID","' . $_SESSION["userID"] . '");
                sessionStorage.setItem("fname","' . $_SESSION["firstname"] . '");
                sessionStorage.setItem("lname","' . $_SESSION["lastname"] . '");
                sessionStorage.setItem("member","' . $_SESSION["member"] . '");
            </script>';
    } elseif (isset($_SESSION['admin'])) {
        echo '<script>
        sessionStorage.setItem("adminID","' . $_SESSION["adminID"] . '");
        sessionStorage.setItem("fname","' . $_SESSION["firstname"] . '");
        sessionStorage.setItem("lname","' . $_SESSION["lastname"] . '");
        sessionStorage.setItem("title","' . $_SESSION["title"] . '");
    </script>';
    }
    ?>
    <script src="js/myProf/animation.js"></script>
    <script src="js/myProf/function.js"></script>
    <script src="js/logIn.js"></script>
</body>

</html>