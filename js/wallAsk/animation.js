// navBar drop logIn
var userBtn = document.querySelector(".user-st");
var dropDownDiv = document.querySelector(".user-drop-down");

userBtn.addEventListener("click", () => {
  dropDownDiv.style.display = "flex";
});
function dropDisplayNone() {
  dropDownDiv.style.display = "none";
}

// main height fixed
var main = document.querySelector("main");
var leftNav = document.querySelector(".side-bar-left");
var wall = document.querySelector(".wall-container");
var rightNav = document.querySelector(".side-bar-right");
var rnBox = document.querySelector;

function fixHeight() {
  main.style.height = document.body.clientHeight - 110 + "px";
  leftNav.style.height = document.body.clientHeight - 110 + "px";
  wall.style.height = document.body.clientHeight - 110 + "px";
  rightNav.style.height = document.body.clientHeight - 110 + "px";
}
fixHeight();

window.addEventListener("resize", function (event) {
  fixHeight();
});

//animation rotate

const rotateDiv = document.querySelector("#rotate");

window.onload = (event) => {
  rotateDiv.classList.add("show");
};

// animation SingIn
