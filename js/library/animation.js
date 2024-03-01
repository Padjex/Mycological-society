// fixed SideBar
window.addEventListener("scroll", function (event) {
  fixedSideBar();
});
// onReload go to top
// history.scrollRestoration = "manual";
window.onload = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function fixedSideBar() {
  var x = window.pageYOffset;
  var sideBar = document.querySelector(".side-bar-container");
  if (x > 69) {
    sideBar.style.position = "fixed";
    sideBar.style.top = "39px";
  } else {
    sideBar.style.position = "fixed";
    sideBar.style.top = 110 - x + "px";
  }
}
// navBar drop logIn
var userBtn = document.querySelector(".user-st");
var dropDownDiv = document.querySelector(".user-drop-down");

userBtn.addEventListener("click", () => {
  dropDownDiv.style.display = "flex";
});
function dropDisplayNone() {
  dropDownDiv.style.display = "none";
}

// fixed main
var main1 = document.querySelector(".main1");
var main2 = document.querySelector(".main2");
main1.style.width = document.body.clientWidth - 200 + "px";
main2.style.width = document.body.clientWidth - 200 + "px";

window.addEventListener("resize", function (event) {
  main1.style.width = document.body.clientWidth - 200 + "px";
  main2.style.width = document.body.clientWidth - 200 + "px";
});

//Vertical slider//

var sliderCon = document.querySelector(".st-sec2-slider");
var sliderL = document.querySelector(".slider-left");
var sliderR = document.querySelector(".slider-right");

var upBtn = document.querySelector(".slider-up-btn");
var dnBtn = document.querySelector(".slider-down-btn");

var sliderLenght = sliderR.querySelectorAll(".slides").length;

var sliderHeight = sliderR.clientHeight;

sliderR.style.top = -(sliderLenght - 1) * sliderHeight + "px";

let activeidex = 0;

upBtn.addEventListener("click", () => changeSlide("up"));
dnBtn.addEventListener("click", () => changeSlide("down"));

var interval;

function startInterval() {
  interval = setInterval(() => changeSlide("up"), 5000);
}

sliderCon.addEventListener("mouseover", function () {
  clearInterval(interval);
});
sliderCon.addEventListener("mouseout", function () {
  interval = setInterval(() => changeSlide("up"), 7000);
});

const changeSlide = (direction) => {
  if (direction === "up") {
    activeidex++;
    if (activeidex > sliderLenght - 1) {
      activeidex = 0;
    }
  } else if (direction === "down") {
    activeidex--;
    if (activeidex < 0) {
      activeidex = sliderLenght - 1;
    }
  }
  sliderR.style.transform = "translateY(" + activeidex * sliderHeight + "px)";
  sliderL.style.transform = "translateY(-" + activeidex * sliderHeight + "px)";
};

// scroll on button

var btn = document.querySelector(".sec2-btnShowMore");
btn.addEventListener("click", () => scrollDown());

var yOffset = -40;
var el = document.querySelector(".start-section3-st");
var y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

function scrollDown() {
  window.scrollTo({ top: y, behavior: "smooth" });
}

// navbar fixed
// function fixNav() {
//   var x = window.pageYOffset;

//   var nav = document.querySelector("nav");
//   console.log(nav.getBoundingClientRect().top);
// }

// window.addEventListener("scroll", function (event) {
//   fixNav();
// });

// fixHeight

// side bar from species.php;
