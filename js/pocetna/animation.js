// if LOG IN doesn't work???
if (sessionStorage.getItem("userID")) {
  // console.log("afas");
  window.open("myProfile.php");
}
// logOut alert
window.addEventListener("load", function () {
  const urlLog = new URLSearchParams(location.search);
  var log = urlLog.get("logOut");
  if (log == "true") {
    alert("Успешно сте се одјавили.");
  }
});

// navBar drop logIn
var userBtn = document.querySelector(".user-st");
var dropDownDiv = document.querySelector(".user-drop-down");

userBtn.addEventListener("click", () => {
  dropDownDiv.style.display = "flex";
});
function dropDisplayNone() {
  dropDownDiv.style.display = "none";
}

// start Animation
// need to repair
// var boxes = document.querySelectorAll(".animation-divs");
// window.addEventListener("load", () => {
//   for (var i = 0; i < boxes.length; i++) {
//     boxes[i].classList.add("rotate");
//   }
// });

// singIn scrollTo singIn Div

var btnSingIn = document.querySelector(".user-drop-down-btnSingIn");
btnSingIn.addEventListener("click", () => scrollDown());

var yOffset = -40;
var singInDiv = document.querySelector(".singIn-container");
var y = singInDiv.getBoundingClientRect().top + window.pageYOffset + yOffset;

function scrollDown() {
  window.scrollTo({ top: y, behavior: "smooth" });
}
var btnLogIn = document.querySelector(".user-drop-down-btnLogIn");
btnLogIn.addEventListener("click", function () {
  window.open("logIn.php", "_self");
});

window.onload = function () {
  if (sessionStorage.getItem("singIN") == "scrollSingin") {
    scrollDown();
    sessionStorage.setItem("singIN", "");
  }
};

// sectio1 - blur effect
var load = 0;
var section1bg = document.querySelector(".section1-st");
let int = setInterval(() => blurring(), 7);

function blurring() {
  load++;
  section1bg.style.filter = "blur(" + (98 - load) + "px)";
  if (load > 99) {
    clearInterval(int);
  }
}

// section1 - show more
var section1btn = document.querySelector(".section1-btn");
section1btn.addEventListener("click", () => showMore());

var stopF = 0;

function showMore() {
  if (stopF == 1) {
    return;
  }
  stopF = 1;
  var load2 = 0;
  var sectio1text2 = document.querySelector(".section1-text2");

  let int2 = setInterval(() => opacityF(), 14);

  function opacityF() {
    load2++;
    sectio1text2.style.opacity = load2 / 100;
    section1btn.style.opacity = (100 - load) / 100;
    if (load2 > 100) {
      clearInterval(int2);
    }
  }
}

// section 2 slider
var divPart1 = document.querySelector(".sec2-part1");
var buttonPart1 = divPart1.querySelectorAll("button");

buttonPart1[0].addEventListener("click", () => plusSlide(-1, 0));
buttonPart1[1].addEventListener("click", () => plusSlide(1, 0));

var divPart2 = document.querySelector(".sec2-part2");
var buttonPart2 = divPart2.querySelectorAll("button");

buttonPart2[0].addEventListener("click", () => plusSlide(-1, 1));
buttonPart2[1].addEventListener("click", () => plusSlide(1, 1));

var divPart3 = document.querySelector(".sec2-part3");
var buttonPart3 = divPart3.querySelectorAll("button");

buttonPart3[0].addEventListener("click", () => plusSlide(-1, 2));
buttonPart3[1].addEventListener("click", () => plusSlide(1, 2));

let index = [1, 1, 1];
let slideId = ["slide1", "slide2", "slide3"];

showSlide(1, 0);
showSlide(1, 1);
showSlide(1, 2);

function plusSlide(x, xn) {
  showSlide((index[xn] += x), xn);
}

function showSlide(x, xn) {
  let slides = document.getElementsByClassName(slideId[xn]);
  if (x > slides.length) {
    index[xn] = 1;
  }
  if (x < 1) {
    index[xn] = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[index[xn] - 1].style.display = "block";
}

// navbar fixed
// function fixNav() {
//   var x = window.pageYOffset;
//   var nav = document.querySelector("nav");
//   if (x > 500) {
//     nav.style.position = "fixed";
//   } else {
//     nav.style.position = "sticky";
//   }
// }

// window.addEventListener("scroll", function (event) {
//   fixNav();
// });

// onRelaod go to top
history.scrollRestoration = "manual";
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

//section 2 animation 1

const sec2div1 = document.querySelector(".sec2-row1-st");
var trigger1 = window.innerHeight * 0.9;
window.addEventListener("scroll", showDiv1);

function showDiv1() {
  const boxTop = sec2div1.getBoundingClientRect().top;
  if (trigger1 > boxTop) {
    sec2div1.classList.add("show");
  } else {
    sec2div1.classList.remove("show");
  }
}

// section 2 animation 2

const section2 = document.querySelector(".section2-st");
const sec2Part1 = document.querySelector(".sec2-part1");
const sec2Part2 = document.querySelector(".sec2-part2");
const sec2Part3 = document.querySelector(".sec2-part3");

var trigger2 = window.innerHeight * 0.8;
window.addEventListener("scroll", showBoxes);

function showBoxes() {
  const boxTop = section2.getBoundingClientRect().top;
  if (trigger2 > boxTop) {
    sec2Part2.classList.add("show");
    sec2Part1.classList.add("show");
    sec2Part3.classList.add("show");
  } else {
    sec2Part2.classList.remove("show");
    sec2Part1.classList.remove("show");
    sec2Part3.classList.remove("show");
  }
}
// bagg, pri sporom scorll-u, check dobija vrednos false, ali klasa show ostaje??!!
// Verujem da je problem u brizni funkcije addEventListener??!!

// function showPrat1(ch) {
//   if (ch == true) {
//     var timer = setTimeout(function () {
//       sec2Part1.classList.add("show");
//     }, 400);
//   } else if (ch == false) {
//     sec2Part1.classList.remove("show");
//   }
// }
// function showPrat3(ch) {
//   if (ch === true) {
//     var timer = setTimeout(function () {
//       sec2Part3.classList.add("show");
//     }, 700);
//   } else if (ch === false) {
//     sec2Part3.classList.remove("show");
//     // console.log(sec2Part3.classList);
//     // console.log(ch);
//   }
// }

// SECTION 3 animation
const section3 = document.querySelector(".section3-st");
const sec3Part1 = document.querySelector(".sec3-part1");

window.addEventListener("scroll", showDiv2);

function showDiv2() {
  var trigger2 = window.innerHeight * 0.8;
  const boxTop = section3.getBoundingClientRect().top;
  if (trigger2 > boxTop) {
    sec3Part1.classList.add("show");
  } else {
    sec3Part1.classList.remove("show");
  }
}

// singIn animation1

var png1 = document.querySelector(".singInImg1");

var timer1;
var jumpTop1 = 160;
bottomToTop1 = true;

var once1 = 0;

window.addEventListener("scroll", function () {
  var triggerS1 = this.window.innerHeight * 0.9;
  var singInHeight = document
    .querySelector(".singIn-container")
    .getBoundingClientRect().top;
  if (triggerS1 > singInHeight && once1 == 0) {
    timer1 = this.setInterval(jumpMus1, 100);
  } else {
    this.clearInterval(timer1);
  }
});

function jumpMus1() {
  if (png1.getBoundingClientRect().left < -100) {
    return;
  }

  if (bottomToTop1) {
    jumpTop1 -= 10;
  } else {
    jumpTop1 += 10;
  }
  png1.style.marginTop = jumpTop1 + "px";
  png1.classList.add("show");
  if (jumpTop1 == 40) {
    bottomToTop1 = false;
  }
  if (jumpTop1 == 160) {
    bottomToTop1 = true;
  }
  once1 += 1;
}

// singIn animation2

// var png2 = document.querySelector(".singInImg2");

// var timer2;
// var jumpTop2 = 160;
// bottomToTop2 = true;

// var once2 = 0;

// window.addEventListener("scroll", function () {
//   var triggerS1 = this.window.innerHeight * 0.24;
//   var singInHeight = document
//     .querySelector(".singIn-container")
//     .getBoundingClientRect().top;
//   if (triggerS1 > singInHeight && once2 == 0) {
//     timer2 = this.setInterval(jumpMus2, 100);
//   } else {
//     this.clearInterval(timer2);
//   }
// });

// function jumpMus2() {
//   if (png2.getBoundingClientRect().right < -100) {
//     return;
//   }

//   if (bottomToTop2) {
//     jumpTop2 -= 10;
//   } else {
//     jumpTop2 += 10;
//   }
//   png2.style.marginTop = jumpTop2 + "px";
//   png2.classList.add("show");
//   if (jumpTop2 == 40) {
//     bottomToTop2 = false;
//   }
//   if (jumpTop2 == 160) {
//     bottomToTop2 = true;
//   }
//   once2 += 1;
// }
// // singIn animation3

// var png3 = document.querySelector(".singInImg3");

// var timer3;
// var jumpTop3 = 160;
// bottomToTop3 = true;

// var once3 = 0;

// window.addEventListener("scroll", function () {
//   var triggerS1 = this.window.innerHeight * 0.84;
//   var singInHeight = document
//     .querySelector(".singIn-container")
//     .getBoundingClientRect().top;
//   if (triggerS1 > singInHeight && once3 == 0) {
//     timer3 = this.setInterval(jumpMus3, 100);
//   } else {
//     this.clearInterval(timer3);
//   }
// });

// function jumpMus3() {
//   if (png3.getBoundingClientRect().right < -100) {
//     return;
//   }

//   if (bottomToTop3) {
//     jumpTop3 -= 10;
//   } else {
//     jumpTop3 += 10;
//   }
//   png3.style.marginTop = jumpTop3 + "px";
//   png3.classList.add("show");
//   if (jumpTop3 == 40) {
//     bottomToTop3 = false;
//   }
//   if (jumpTop3 == 160) {
//     bottomToTop3 = true;
//   }
//   once3 += 1;
// }
// // singIn animation4

// var png4 = document.querySelector(".singInImg4");

// var timer4;
// var jumpTop4 = 160;
// bottomToTop4 = true;

// var once4 = 0;

// window.addEventListener("scroll", function () {
//   var triggerS1 = this.window.innerHeight * 0.34;
//   var singInHeight = document
//     .querySelector(".singIn-container")
//     .getBoundingClientRect().top;
//   if (triggerS1 > singInHeight && once4 == 0) {
//     timer4 = this.setInterval(jumpMus4, 100);
//   } else {
//     this.clearInterval(timer4);
//   }
// });

// function jumpMus4() {
//   if (png4.getBoundingClientRect().left < -100) {
//     return;
//   }

//   if (bottomToTop4) {
//     jumpTop4 -= 10;
//   } else {
//     jumpTop4 += 10;
//   }
//   png4.style.marginTop = jumpTop4 + "px";
//   png4.classList.add("show");
//   if (jumpTop4 == 40) {
//     bottomToTop4 = false;
//   }
//   if (jumpTop4 == 160) {
//     bottomToTop4 = true;
//   }
//   once4 += 1;
// }
