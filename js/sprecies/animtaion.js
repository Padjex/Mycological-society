// fixed SideBar
window.addEventListener("scroll", function (event) {
  fixedSideBar();
});
window.onload = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

function fixedSideBar() {
  var x = window.pageYOffset;
  var sideBar = document.querySelector(".side-bar-container");
  if (x > 69) {
    sideBar.style.position = "fixed";
    sideBar.style.top = "40px";
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
var main1 = document.querySelector(".main-st");

main1.style.width = document.body.clientWidth - 200 + "px";

window.addEventListener("resize", function (event) {
  main1.style.width = document.body.clientWidth - 200 + "px";
});
// slider

var sliderCon = document.querySelector(".con-slider2");
var sliders = sliderCon.querySelectorAll("div");
var sliderLenght = sliders.length;
var btnSleft = document.querySelector(".sec1-left-button");
var btnSright = document.querySelector(".sec1-right-button");

var slLeft = document.querySelector(".con-slider1");
var slRight = document.querySelector(".con-slider3");
// var classes = sliders[1].classList[1];

let activeidex = 0;

document.onkeydown = function (e) {
  if (e.keyCode == "37") {
    changeSlide("left");
  }
  if (e.keyCode == "39") {
    changeSlide("right");
  }
};
var sliderUrl = Array();
function setStartUrl() {
  url1 = document.querySelector(".sl1");
  url2 = document.querySelector(".sl2");
  url3 = document.querySelector(".sl3");
  url4 = document.querySelector(".sl4");
  url5 = document.querySelector(".sl5");

  url1 = window.getComputedStyle(url1, false).backgroundImage;
  url2 = window.getComputedStyle(url2, false).backgroundImage;
  url3 = window.getComputedStyle(url3, false).backgroundImage;
  url4 = window.getComputedStyle(url4, false).backgroundImage;
  url5 = window.getComputedStyle(url5, false).backgroundImage;
  sliderUrl.push(url1, url2, url3, url4, url5);

  slLeft.style.backgroundImage = url5;
  slRight.style.backgroundImage = url2;
}

btnSleft.addEventListener("click", () => changeSlide("left"));
btnSright.addEventListener("click", () => changeSlide("right"));

function changeSlide(direction) {
  const sliderWidth = sliderCon.getBoundingClientRect().width - 8;
  if (direction === "left") {
    activeidex--;
    if (activeidex < 0) {
      activeidex = sliderLenght - 1;
    }
  } else if (direction === "right") {
    activeidex++;
    if (activeidex > sliderLenght - 1) {
      activeidex = 0;
    }
  }
  sliders.forEach((element) => {
    element.style.transform = "translateX(-" + activeidex * sliderWidth + "px)";
  });

  if (activeidex === sliderLenght - 1) {
    slRight.style.backgroundImage = sliderUrl[0];
  } else {
    slRight.style.backgroundImage = sliderUrl[activeidex + 1];
  }
  if (activeidex === 0) {
    slLeft.style.backgroundImage = sliderUrl[sliderLenght - 1];
  } else {
    slLeft.style.backgroundImage = sliderUrl[activeidex - 1];
  }
}

// scroll on click
var btnAbout = document.querySelector(".mN-about");
var btnTaxo = document.querySelector(".mN-Taxonomic");
var btnEtym = document.querySelector(".mN-Etymology");
var btnID = document.querySelector(".mN-ID");

var divAbout = document.querySelector(".sec2-about");
var divTaxo = document.querySelector(".sec2-taxonomy");
var divEtym = document.querySelector(".sec2-Etymology");
var divID = document.querySelector(".section3-st");
const scrollTo = (d) => {
  var y = d.getBoundingClientRect().top + window.pageYOffset - 40;
  window.scrollTo({ top: y, behavior: "smooth" });
};

btnAbout.addEventListener("click", () => scrollTo(divAbout));
btnTaxo.addEventListener("click", () => scrollTo(divTaxo));
btnEtym.addEventListener("click", () => scrollTo(divEtym));
btnID.addEventListener("click", () => scrollTo(divID));

// for SideBar
var list = document.querySelector(".family-list");
var li = list.querySelectorAll("li");
li.forEach((element) => {
  element.addEventListener("click", () => goToLib(element));
});

function goToLib(e) {
  var x = e.innerHTML;
  sessionStorage.setItem("famName", x);
  window.open("library.php", "_self");
}
