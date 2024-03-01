// LogOut btn
var logOut = document.querySelector(".btn-logOut");
logOut.addEventListener("click", function () {
  var t = "Да ли сте сигурни?";
  if (confirm(t) == true) {
    sessionStorage.clear();
    var req = new XMLHttpRequest();
    req.open("GET", "php/conn/logOut.php?logOut=true");
    req.send();
    req.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        sessionStorage.clear();
        window.open("index.php?logOut=true", "_self");
      }
    };
  }
});
// btnmyProfile
var btnMyP = document.querySelector(".btn-myProfile");
btnMyP.addEventListener("click", function () {
  window.open("myProfile.php", "_self");
});

// logIn

var firstL = sessionStorage.getItem("fname").charAt(0).toLocaleLowerCase();
var checkLatin = /^[šđčćžшђчћжљњџертзуиопасдфгхјклџцвбнм]$/;
if (firstL.match(checkLatin)) {
  // need to made convertor from cyrillic to latin, or made icon and set imgs
  if (firstL.charCodeAt(0) == 1084) {
    firstL = "m";
  } else {
    var x = firstL.charCodeAt(0);
    x = x - 1006;
    firstL = String.fromCharCode(x);
  }
}

var userIcon = document.querySelector(".fa-user");
userIcon.classList.replace("fa-user", "fa-" + firstL);

document.querySelector(".spec-st2").style.display = "none";
