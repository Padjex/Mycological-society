window.onload = getData();
function getData() {
  var fn = sessionStorage.getItem("fn");
  var sn = sessionStorage.getItem("sn");
  var req = new XMLHttpRequest();
  req.open("GET", "php/conn/getSpecies.php?fn=" + fn + "&sn=" + sn);
  req.send();
  req.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      var data = JSON.parse(this.response);
      if (data["musSection"] == null) {
        var table = document.querySelector(".sec3-table-con1");
      } else {
        var table = document.querySelector(".sec3-table-con2");
      }
      fillData(data, fn, sn, table);
    }
  };
}
function fillData(d, fn, sn, tab) {
  document.querySelector(".sec1-name-species").innerHTML = fn + " " + sn;

  document.querySelector(".sec2-about-p").innerHTML = d["about"];

  document.querySelector(".sec2-taxonomy-p").innerHTML = d["taxonomy"];
  document.querySelector(".sec2-Etymology-p").innerHTML = d["etymology"];
  tab.querySelector(".info-cap").innerHTML += "<br>" + d["cap"];
  tab.querySelector(".info-gills").innerHTML += "<br>" + d["gills"];
  tab.querySelector(".info-stem").innerHTML += "<br>" + d["stem"];
  tab.querySelector(".info-spores").innerHTML += "<br>" + d["spores"];
  tab.querySelector(".info-taste").innerHTML += "<br>" + d["taste"];
  tab.querySelector(".info-habitat").innerHTML += "<br>" + d["habitat"];
  tab.querySelector(".info-season").innerHTML += "<br>" + d["season"];
  tab.querySelector(".info-similar").innerHTML += "<br>" + d["similarSp"];

  // imgs ID
  var capI = d["cap_img"];
  tab.querySelector(".img-cap").style.backgroundImage = "url(" + capI + ")";
  var capI = d["gills_img"];
  tab.querySelector(".img-gills").style.backgroundImage = "url(" + capI + ")";
  var capI = d["stem_img"];
  tab.querySelector(".img-stem").style.backgroundImage = "url(" + capI + ")";
  var capI = d["spores_img"];
  tab.querySelector(".img-spores").style.backgroundImage = "url(" + capI + ")";

  // slider imgs

  var sliderCont = document.querySelector(".con-slider2");
  var slidersDivs = sliderCont.querySelectorAll(".slide");
  var slideUrl = d["main_imgs"];
  var urlPlus = "/" + fn.charAt(0) + sn.charAt(0);
  var slideUrl = slideUrl + urlPlus;

  for (var i = 1; i < 6; i++) {
    slidersDivs[i - 1].style.backgroundImage = "url(" + slideUrl + i + ".jpg)";
  }
  setStartUrl();

  // musSection != null
  if (d["musSection"] != null) {
    tab.querySelector(".info-section").innerHTML += "<br>" + d["musSection"];
    var secImg = d["musSection_img"];
    tab.querySelector(".img-section").style.backgroundImage =
      "url(" + secImg + ")";

    document.querySelector(".sec3-table-con1").style.display = "none";
    document.querySelector(".sec3-table-con2").style.display = "flex";
  }
}
