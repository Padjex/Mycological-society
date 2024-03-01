<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html" ; charset="utf-8" />
    <title>Mikološko društvo Divčibare-LogIn</title>
    <link rel="stylesheet" href="css/logIn/login.css" />
</head>

<body>
    <div class="mainDiv">
        <div class="left-div">
            <h1>
                Миколошко-еколошко друштво <br /><strong id="name-st">Дивчибаре
                </strong>
            </h1>
            <img class="png-logo" src="img/glavne/logo.png" alt="..." />
        </div>
        <div class="right-div">
            <button class="btn-guest">Почетна</button>
            <form action="php/conn/logIn.php" class="logIn-form" name="logInForm" method="POST">
                <h2>Пријава</h2>
                <label class="lab-SingIn">Немате налог?</label>
                <input name="emailLog" type="email" class="form-fName" placeholder="Ваша е-адреса" />
                <input name="passwordLog" type="password" class="form-password" placeholder="Ваша лозинка" />
                <button name="btnLog" type="submit" class="form-button">Пријави се</button>
                <label class="lab-forgot-pass">Забрављена лозинка?</label>
            </form>
        </div>
        <div class="message-box">
        </div>
    </div>
    <script src="js/logIn/function.js"></script>
</body>

</html>