// main 2, fill main
var list = document.querySelector(".family-list");
var li = list.querySelectorAll("li");
var h = document.querySelector(".m2-familyName");

var main1 = document.querySelector(".main1");
var main2 = document.querySelector(".main2");

li.forEach((element) => {
  element.addEventListener("click", () => requireData(element.innerHTML));
});

var artGrid = document.querySelector(".artical-grid");

function requireData(re) {
  main1.style.display = "none";
  main2.style.display = "block";
  h.innerHTML = re;
  var req = new XMLHttpRequest();
  var descDiv = document.querySelector(".m2-description");
  req.open("GET", "php/conn/getFamily.php?family=" + re);
  req.send();
  req.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      descDiv.innerHTML = this.responseText;
    }
  };

  requireDataSp(re);
}

async function requireDataSp(sp) {
  var req = new XMLHttpRequest();
  req.open("POST", "php/conn/getSpecie.php?species=" + sp);
  if (sessionStorage.getItem("userID")) {
    req.send(sessionStorage.getItem("userID"));
  } else {
    req.send();
  }
  artArray = Array();
  req.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      var json = this.response;
      // need to change - all artical divs put in an array, and when arrey is ready, put all in artical-grid
      json = JSON.parse(json);
      json.forEach(function (e) {
        fillSpecies(e, sp);
      });
      artGrid.innerHTML = "";
      artArray.forEach(function (e) {
        artGrid.appendChild(e);
      });
    }
  };
}

var divToClone = document.querySelector(".artical");
var artArray = Array();

// create artical
function fillSpecies(sp, fn) {
  var divToFill = divToClone.cloneNode(true);
  var speciesName = divToFill.querySelector(".art-spec-name");
  speciesName.innerHTML = fn + " " + sp.name;
  speciesName.addEventListener("click", () => {
    sessionStorage.setItem("fn", fn);
    sessionStorage.setItem("sn", sp.name);
    window.open("species.php", "_self");
  });

  // img for season
  var habImgUrl = sp["habitat"];
  var subImgUrl = sp["substrate"];
  var useImgUrl = sp["use"];

  divToFill.querySelector(".img-habit").style.backgroundImage =
    "url(" + habImgUrl + ")";
  divToFill.querySelector(".img-substrate").style.backgroundImage =
    "url(" + subImgUrl + ")";
  divToFill.querySelector(".img-use").style.backgroundImage =
    "url(" + useImgUrl + ")";

  // season calendar
  var season = sp["season"];
  var trimMounth = Array();
  for (var i = 0; i < season.length; i++) {
    if (season.charAt(i) != " " && season.charAt(i) != null) {
      trimMounth.push(season.charAt(i));
    }
  }
  var mounth = Array();
  for (var i = 0; i < trimMounth.length; i++) {
    if (trimMounth[i] >= 0 && trimMounth[i] <= 12) {
      if (trimMounth[i + 1] >= 0 && trimMounth[i + 1] <= 12) {
        mounth.push(trimMounth[i] + trimMounth[i + 1]);
        i++;
      } else {
        mounth.push(trimMounth[i]);
      }
    }
  }
  mounth.forEach(function (e) {
    var qs = ".s" + e;
    var divSeason = divToFill.querySelector(qs);
    divSeason.style.backgroundColor = "green";
  });

  // imgs for slider
  // need to repair
  var sliderM = divToFill.querySelector(".art-slider-container");

  var sliderUrl = sp["mainImg"];
  var urlPlus = "/" + fn.charAt(0) + sp["name"].charAt(0);
  urlPlus = urlPlus.toLowerCase();
  sliderUrl = sliderUrl + urlPlus;

  for (var i = 1; i < 6; i++) {
    var slider = document.createElement("div");
    slider.style.backgroundImage = "url(" + sliderUrl + i + ".jpg)";
    sliderM.appendChild(slider);
  }
  var sessSto = /^[0-1]{1,4}$/;
  if (sessionStorage.getItem("userID")) {
    favMush(divToFill, sp["favorite"], fn, sp["name"]);
  } else {
    divToFill.querySelector(".favMush").style.display = "none";
  }
  // artGrid.appendChild(divToFill);
  artArray.push(divToFill);

  // for sliders;
}
// favorite mushroom

function favMush(divToFill, fav, fn, sp) {
  var heartA = divToFill.querySelector(".favMush");

  heartA.setAttribute("favorite", fav);

  if (fav == "false" || !fav) {
    heartA.addEventListener("mouseover", () => mouOver(heartA), true);
    heartA.addEventListener("mouseleave", () => mouLeave(heartA), true);
  } else {
    heartA.classList.replace("fa-regular", "fa-solid");
    heartA.style.color = "#9c0000";
  }

  heartA.addEventListener("click", () => addRemFavoriteMush(heartA, fn, sp));
}
function mouLeave(heart) {
  heart.classList.replace("fa-solid", "fa-regular");
}
function mouOver(heart) {
  heart.classList.replace("fa-regular", "fa-solid");
}
// favorite mushroom on click
function addRemFavoriteMush(heart, fn, sp) {
  var req = new XMLHttpRequest();
  var favorite = heart.getAttribute("favorite");
  req.open("POST", "php/conn/addRemoveFav.php?fav=" + favorite);
  var json = {
    id: sessionStorage.getItem("userID"),
    fn: fn,
    sp: sp,
  };

  json = JSON.stringify(json);
  req.send(json);
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.response == "true") {
        if (favorite == "true") {
          heart.setAttribute("favorite", "false");
          heart.style.color = "#f86464";
          heart.addEventListener("mouseover", () => mouOver(heart), true);
          heart.addEventListener("mouseleave", () => mouLeave(heart), true);
        } else if (favorite == "false") {
          heart.classList.replace("fa-regular", "fa-solid");
          heart.setAttribute("favorite", "true");
          heart.style.color = "#9c0000";
          heart.addEventListener("mouseleave", () => mouOver(heart));
        }
      }
      // sessionStorage.setItem("forReload", fn);
      // window.open("library.php", "_self");
    }
  };
}
// if (sessionStorage.getItem("forReload") != null) {
//   requireData(sessionStorage.getItem("forReload"));
//   sessionStorage.removeItem("forReload");
// }

// from species.php
if (sessionStorage.getItem("famName") != null) {
  requireData(sessionStorage.getItem("famName"));
  sessionStorage.removeItem("famName");
}

// check LogIn (when close browser php session is still active, but js session is empty)
