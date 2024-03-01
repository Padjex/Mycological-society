// sound play
var time;

var audio = document.querySelector("audio");
window.addEventListener("load", () => {
  audio.play();
  time = setTimeout(stopAudio, 4400);
});
function stopAudio() {
  audio.pause();
}

var animationDivs = document.querySelectorAll(".animation-divs");

window.addEventListener("load", winds);

function wind1() {
  for (var i = 0; i < animationDivs.length; i++) {
    animationDivs[i].classList.add("wind1");
  }
}

function wind2() {
  for (var i = 0; i < animationDivs.length; i++) {
    animationDivs[i].classList.remove("wind1");
  }
}

function overblow() {
  for (var i = 0; i < animationDivs.length; i++) {
    animationDivs[i].classList.add("overblow");
  }
}

function bodyScroll() {
  document.body.style.overflowY = "scroll";
}
function displayNone() {
  for (var i = 0; i < animationDivs.length; i++) {
    animationDivs[i].style.display = "none";
  }
}

var timeAnimation;

function winds() {
  wind1();
  animationDivs[1].addEventListener("webkitTransitionEnd", () => {
    wind2();
    animationDivs[1].addEventListener("webkitTransitionEnd", () => {
      wind1();
      animationDivs[3].addEventListener("webkitTransitionEnd", () => {
        overblow();
        bodyScroll();
        animationDivs[1].addEventListener("webkitTransitionEnd", () => {
          displayNone();
        });
      });
    });
  });
}
var timer2;
var marginBottom = 200;
bottomToTop2 = true;
var mushroom = document.querySelector(".animationMush");
console.log(bottomToTop1);
function jumpMushroom() {
  if (bottomToTop2) {
    marginBottom -= 10;
  } else {
    marginBottom += 10;
  }
  mushroom.style.marginBottom = marginBottom + "px";
  mushroom.classList.add("left");
  if (marginBottom == 0) {
    bottomToTop2 = false;
  }
  if (marginBottom == 200) {
    bottomToTop2 = true;
  }
  var mushroomX = mushroom.getBoundingClientRect().left;
  if (mushroomX < -100) {
    this.clearInterval(timer2);
    return;
  }
}
function startJump() {
  var mushroomX = mushroom.getBoundingClientRect().left;

  if (mushroomX > -100) {
    timer2 = setInterval(function () {
      jumpMushroom();
    }, 9);
  } else {
    this.clearInterval(timer2);
    return;
  }
}

var startj = setTimeout(function () {
  startJump();
}, 3000);
//mushJump doesn't work?
// setTimeout(jumpMus, 3600);
// var mushroom = document.querySelector(".animationMush");

// function getTranslateX() {
//   var style = window.getComputedStyle(mushroom);
//   var matrix = new WebKitCSSMatrix(style.transform);
//   return matrix.m41 - 200;
// }

// function jumpMus() {
//   mushroom.style.transform = "translateX(" + getTranslateX() + "px)";
//   mushroom.classList.add("up");
//   mushroom.addEventListener("webkitTransitionEnd", () => {
//     downMush();
//   });
// }

// function downMush() {
//   mushroom.classList.remove("up");
//   if (mushroom.getBoundingClientRect().left < -100) {
//     return;
//   } else {
//     mushroom.addEventListener("webkitTransitionEnd", () => {
//       jumpMus();
//     });
//   }
// }
