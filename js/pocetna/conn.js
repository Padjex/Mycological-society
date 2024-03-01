// Validation
var btnS = document.querySelector(".form-button");
btnS.addEventListener("click", () => formValidation());

function formValidation() {
  var fname = document.formSingIn.firstname.value;
  var lname = document.formSingIn.lastname.value;
  var email = document.formSingIn.email.value;
  var pass1 = document.formSingIn.pass1.value;
  var pass2 = document.formSingIn.pass2.value;

  var fnameP =
    /^[A-Z-ŠĐČĆŽШЂЧЋЖЉЊЏЕРТЗУИОПАСДФГХЈКЛЦВБНМ][a-z-šđčćžшђчћжљњџертзуиопасдфгхјклџцвбнм]{2,15}$/;
  var lnameP =
    /^[A-Z-ŠĐČĆŽШЂЧЋЖЉЊЏЕРТЗУИОПАСДФГХЈКЛЦВБНМ][a-z-šđčćžшђчћжљњџертзуиопасдфгхјклџцвбнм]{3,25}$/;
  var emailP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (fname.match(fnameP)) {
    if (lname.match(lnameP)) {
      if (email.match(emailP)) {
        if (pass1 === pass2 && pass1.length > 7) {
          sendData(fname, lname, email, pass1);
        } else {
          console.log(pass1);
          document.formSingIn.pass1.value = "";
          document.formSingIn.pass2.value = "";
          document.formSingIn.pass1.focus();
          alert(
            "Лозинке морају да се подударају, и да имају 8 или више карактера!!!"
          );
        }
      } else {
        document.formSingIn.email.value = "";
        document.formSingIn.email.focus();
        alert("Унесите валидан е-маил!");
      }
    } else {
      document.formSingIn.lastname.value = "";
      document.formSingIn.lastname.focus();
      alert("Унесите валидно презиме, прво слово мора бити велико!");
    }
  } else {
    document.formSingIn.firstname.value = "";
    document.formSingIn.firstname.focus();
    alert("Унесите валидно име, прво слово мора бити велико!");
  }
}
function sendData(fn, ln, em, pas) {
  var req = new XMLHttpRequest();
  req.open("POST", "php/conn/singIn.php?p=singIn");

  var json = {
    fname: fn,
    lname: ln,
    email: em,
    password: pas,
  };
  json = JSON.stringify(json);
  req.send(json);

  req.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      if (this.response == "true") {
        alert("Успешно сте се регистровали на наш сајт");
        window.open("logIn.php", "_self");
      } else if (this.response == "duplicateEmail") {
        document.formSingIn.reset();
        alert("Већ постоји корисник са том адресом!");
      } else {
        document.formSingIn.reset();
        alert("Покушајте поново");
      }
    }
  };
}
