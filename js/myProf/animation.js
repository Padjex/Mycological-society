// navBar drop logIn
var userBtn = document.querySelector(".user-st");
var dropDownDiv = document.querySelector(".user-drop-down");

userBtn.addEventListener("click", () => {
  dropDownDiv.style.display = "flex";
});
function dropDisplayNone() {
  dropDownDiv.style.display = "none";
}

// fixed height of divs in main ???????? BAGGGG ???!!!?!?!?!? BAG BAG
var main = document.querySelector("main");

function fixedHeight() {
  var bodyH = document.querySelector("body").clientHeight;
  main.querySelector(".profile-con").style.height = bodyH - 110 + "px";
  main.querySelector(".myFavorites-con").style.height = bodyH - 110 + "px";
  main.querySelector(".myFounds-con").style.height = bodyH - 110 + "px";
  main.style.height = bodyH - 110 + "px";
}
fixedHeight();
window.addEventListener("resize", () => fixedHeight());
