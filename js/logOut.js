// logInn btn
var btnSingIn = document.querySelector(".user-drop-down-btnLogIn");
btnSingIn.addEventListener("click", () => {
  window.open("logIn.php", "_self");
});

// singIN btn
var btnSingIn = document.querySelector(".user-drop-down-btnSingIn");
btnSingIn.addEventListener("click", () => {
  sessionStorage.setItem("singIN", "scrollSingin");
  window.open("index.php", "_self");
});
