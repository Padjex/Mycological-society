// btn guest
var btnGuest = document.querySelector(".btn-guest");
btnGuest.addEventListener("click", () => {
  window.open("index.php", "_self");
});

var btnSingIn = document.querySelector(".lab-SingIn");
btnSingIn.addEventListener("click", () => {
  sessionStorage.setItem("singIN", "scrollSingin");
  window.open("index.php", "_self");
});
var messBox = document.querySelector(".message-box");
// message error
window.onload = function () {
  var req = new XMLHttpRequest();
  req.open("POST", "php/conn/logIn.php");
  req.send();
  req.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      var parms = new URLSearchParams(location.search);
      var error = parms.get("error");
      if (error == "noUser") {
        messBox.style.display = "flex";
        messBox.innerHTML = "Нема корисника са том е-адресом!";
      } else if (error == "passX") {
        messBox.style.display = "flex";
        messBox.innerHTML = "Погрешна лозинка! Покушајте поново.";
      }
      document.body.addEventListener("click", () => {
        messBox.style.display = "none";
      });
    }
  };
};

document.onkeydown = function (e) {
  if (event.keyCode == 220) {
    var form = document.querySelector(".logIn-form");
    var email = form.emailLog.value;
    var pass = form.passwordLog.value;
    var json = {
      em: email,
      pass: pass,
    };
    json = JSON.stringify(json);

    var req = new XMLHttpRequest();
    req.open("POST", "php/conn/logInAd.php?p=da");
    req.send(json);
    req.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (this.response == "error") {
          messBox.style.display = "flex";
          messBox.innerHTML = "Грешка!";
        } else if (this.response == "success") {
          window.open("myProfile.php", "_self");
        }
      }
    };
  }
};
