<nav class="nav-st">
    <div class="left-nav-st">
        <a class="btn-library-st" href="library.php" style="background-color: #464646">
            Библиотека
        </a>
        <?php
        if (!isset($_SESSION['userID']) && !isset($_SESSION['adminID'])) {
            echo '<a class="btn-Pocetna-st" href="index.php"> Почетна </a>';
        }
        ?>
        <div class="dropdown">
            <button class="dropBtn">Детерминација</button>
            <div class="dropdownCon">
                <a class="btn-Determinator" href="index.php"> Детерминатор </a>
                <a class="btn-PitajNas" href="wallAsk.php"> Питај нас </a>
            </div>
        </div>
        <div class="dropdown">
            <button class="dropBtn">О нама</button>
            <div class="dropdownCon">
                <a class="btn-Determinator" href="index.php"> Наше друштво </a>
                <a class="btn-PitajNas" href="index.php"> Наши чланови </a>
            </div>
        </div>
    </div>

    <div class="right-nav-st">
        <div class="map-location-st">
            <i class="icons-nav fa-solid fa-map-location fa-2x"></i>
            <div class="tooltip spec-st1">Пријави проналазак</div>
        </div>

        <div class="user-st">
            <i class="icons-nav fa-solid fa-user fa-2x"></i>
            <div class="tooltip spec-st2">Пријави се</div>
            <div class="user-drop-down" onmouseleave="dropDisplayNone()">
                <?php
                if (isset($_SESSION['userID']) || isset($_SESSION['adminID'])) {
                    echo '
                    <a class="btn-myProfile">' . $_SESSION["firstname"] . ' ' . $_SESSION["lastname"] . '</a>
                    <a class="btn-logOut">Одјави се</a>';
                } else {
                    echo '
                    <a class="user-drop-down-btnLogIn">Пријави се</a>
                    <a class="user-drop-down-btnSingIn">Учлани се</a>';
                }
                ?>
            </div>
        </div>
    </div>
</nav>