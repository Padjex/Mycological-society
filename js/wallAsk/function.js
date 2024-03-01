// admins info
function getAdmins() {
  var req = new XMLHttpRequest();
  req.open("GET", "php/conn/getAdmin.php?ad=da");

  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var json = this.response;
      json = JSON.parse(json);
      json.forEach((element) => {
        admins.push(element);
        fillAdmin(element);
      });
      if (sessionStorage.getItem("adminID")) {
        setImgAdmin(sessionStorage.getItem("adminID"));
      }
    }
  };
  req.send();
}

var admins = Array();

function fillAdmin(d) {
  const li = document.createElement("li");
  li.innerHTML = `<img src="${d.img}" alt="${d.fname}">
    <div class="member-info">
      <h4>${d.fname} ${d.lname}</h4>
      <p>${d.title}</p>
      </div>`;
  adminDiv.appendChild(li);
}
getAdmins();

var adminDiv = document.querySelector(".s-b-r-top");

// change h3 if session set
if (!sessionStorage["userID"] || !sessionStorage["adminID"]) {
  var wallDiv = document.querySelector(".wall-div");
  wallDiv.querySelector("h3").innerHTML =
    "Морате бити пријављени на сајт, како бисте могли да поставите упит.";
}
var numOfLoadedPosts = 0;
window.addEventListener("load", () => getPosts());

// for load posts on scroll
var wallCon = document.querySelector(".wall-container");
var wallDiv = document.querySelector(".wall-con");
var numberOfAllPosts;

function trigerForNewPost() {
  wallCon.addEventListener("scroll", trigerPost);
}
let trigerPost = function () {
  if (numberOfAllPosts > numOfLoadedPosts) {
    var divTop = wallCon.querySelectorAll(".post-div");
    divTop = divTop[divTop.length - 1].getBoundingClientRect().top;
    if (divTop < 840) {
      wallCon.removeEventListener("scroll", trigerPost);
      getPosts();
    }
  }
};

// Load posts
function getPosts() {
  var x = 0;
  var req = new XMLHttpRequest();
  req.open("POST", "php/conn/getPosts.php?get=" + numOfLoadedPosts);
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      numOfLoadedPosts = numOfLoadedPosts + 2;
      var json = this.response;
      json = JSON.parse(json);
      numberOfAllPosts = json[1].num;
      let req = json[0].map(async function (e) {
        return new Promise((resolve) => {
          fillPost(e);
          x++;
          if (x == 2) {
            resolve;
          }
        });
      });
      Promise.all(req).then(trigerForNewPost());
    }
  };
  req.send();
}

// proba

// fill posts
var divToClone = document.querySelector(".post-div");
var wallDiv = document.querySelector(".wall-div");

function fillPost(p) {
  // for comments
  heightOfComments.push({ id: p.postID, height: "74" });

  var divPost = divToClone.cloneNode(true);
  var btnDelet = divPost.querySelector(".btn-deletePost");

  divPost.setAttribute("id", p.postID);

  divPost.querySelector(".p-name").innerHTML =
    p.creatorName + " " + p.creatorLname;
  if (p.member == "da")
    divPost.querySelector(".p-post-member").innerHTML = "члан друштва";
  else if (p.member == "ne")
    divPost.querySelector(".p-post-member").innerHTML = "корисник";
  else divPost.querySelector(".p-post-member").innerHTML = p.title;

  p.time = p.time.substr(0, p.time.length - 3);
  divPost.querySelector(".info-post-time").innerHTML = p.time;

  divPost.querySelector(".text-post-div").innerHTML = p.text;
  // icon
  var userIcon = divPost.querySelector(".userF");
  if (p.member == null) {
    var id = p.creatorID;
    userIcon.style.display = "none";
    for (var i = 0; i < admins.length; i++) {
      if (admins[i].id == id) {
        var img = admins[i].img;
        divPost.querySelector(".user-img").style.backgroundImage =
          "url(" + img + ")";
      }
    }
    divPost.querySelector(".info-post-det").style.display = "none";
    // divPost.querySelector(".set-determination-div").style.display = "none";
  } else {
    var fl = p.creatorName.charAt(0).toLocaleLowerCase();
    userIcon.classList.add("fa-" + fl);

    // check for determination
    if (p.det == "true") {
      showDetermination(divPost, p);
    }
  }
  divPost.querySelector(".num-mess").innerHTML = p.numOfComments;

  // delete post
  if (sessionStorage.getItem("adminID")) {
    if (
      !p.creatorID.includes("a") ||
      p.creatorID == sessionStorage.getItem("adminID")
    ) {
      btnDelet.style.display = "block";
      var t = "Да ли објава није прикладна, желите да је обришете?";
      // if in addEvent sent parameter p.postID, sometimes p.postID is undefined ????!!!
      btnDelet.addEventListener("click", () => deletePost(divPost, t));
    }
  } else if (sessionStorage.getItem("userID") == p.creatorID) {
    btnDelet.style.display = "block";
    var t = "Да ли сте сигурни?";
    // if in addEvent sent parameter p.postID, sometimes p.postID is undefined ????!!!
    btnDelet.addEventListener("click", () => deletePost(divPost, t));
  }

  // admin set determination
  if (sessionStorage.getItem("adminID")) {
    if (p.title) {
      divPost.querySelector(".set-determination-div").style.display = "none";
    }
    var btnSetDet = divPost.querySelector(".set-determination");
    btnSetDet.setAttribute("postID", p.postID);
    btnSetDet.addEventListener("click", setDetermination);
    // confirm determination
    var btnConfirmDet = divPost.querySelector(".det-confirm");
    var pID = p.postID;
    btnConfirmDet.addEventListener("click", () =>
      conDetermination(pID, divPost)
    );
  }

  // load imgs
  // Need to repair - on open slider copy img to slider -not download again
  var urls = Array();
  p.img = p.img.substr(6);
  for (var i = 0; i < p.numOfImgs; i++) {
    var url = p.img + "/img" + i + ".jpg";
    urls.push(url);
  }

  var box1 = divPost.querySelector(".img1");
  var box2 = divPost.querySelector(".img2");
  var box3 = divPost.querySelector(".img3");
  var numImgs = box3.querySelector(".count-of-imgs-div");

  box1.addEventListener("click", () => sliderOpen(urls));
  if (p.numOfImgs > 2) {
    box1.style.backgroundImage = "url(" + urls[0] + ")";
    box2.style.backgroundImage = "url(" + urls[1] + ")";
    box3.style.backgroundImage = "url(" + urls[2] + ")";
    if (p.numOfImgs == 3) {
      numImgs.style.display = "none";
    } else {
      var p = numImgs.querySelector("p");
      p.innerHTML = "+" + (urls.length - +3);
    }
  } else if (p.numOfImgs == 2) {
    // need to repair arrangement of divs
    box1.style.backgroundImage = "url(" + urls[0] + ")";
    box2.style.backgroundImage = "url(" + urls[1] + ")";
    box3.style.display = "none";
  } else if (p.numOfImgs == 1) {
    // need to repair arrangement of divs
    box1.style.backgroundImage = "url(" + urls[0] + ")";
    divPost.querySelector(".img-left-div").style.width = "100%";
    divPost.querySelector(".img-right-div").style.display = "none";
  } else {
    divPost.querySelector(".post-img-div").style.display = "none";
  }
  // comments

  divPost
    .querySelector(".btn-seeComments")
    .addEventListener("click", () => seeComments(divPost));

  divPost.style.display = "block";
  wallDiv.appendChild(divPost);
}

// need to make better optimization, load all imgs from server(not url)
// and put in an array, and manipulation with that array
var sliderCon = document.querySelector(".post-img-slider-div");
var conSlide = sliderCon.querySelector(".all-sliders-con");

function sliderOpen(imgs) {
  // need to create buttons every time, because if they already exist,
  // for open two or more time slider, buttons wil have more addeventListener.
  // removeEventListener does not work
  var btnLeft = document.createElement("i");
  btnLeft.classList.add("fa-regular", "fa-circle-left", "fa-3x", "sl-left");

  var btnRight = document.createElement("i");
  btnRight.classList.add("fa-regular", "fa-circle-right", "fa-3x", "sl-right");

  sliderCon.appendChild(btnRight);
  sliderCon.appendChild(btnLeft);
  sliderCon.style.display = "block";

  for (var i = 0; i < imgs.length; i++) {
    var x = document.createElement("div");
    x.style.backgroundImage = "url(" + imgs[i] + ")";
    x.classList.add("slide");
    conSlide.appendChild(x);
  }
  // exti
  sliderCon.querySelector(".btn-close").addEventListener("click", function () {
    var sl = sliderCon.querySelectorAll(".slide");
    sl.forEach((box) => {
      box.remove();
    });
    btnLeft.remove();
    btnRight.remove();
    sliderCon.style.display = "none";
  });
  sliderCon.setAttribute("index", "0");
  var sliders = sliderCon.querySelectorAll(".slide");
  btnLeft.addEventListener("click", () =>
    changeSlide("left", sliderCon, sliders)
  );
  btnRight.addEventListener("click", () =>
    changeSlide("right", sliderCon, sliders)
  );
  document.onkeydown = function (e) {
    if (e.keyCode == "37") {
      changeSlide("left", sliderCon, sliders);
    }
    if (e.keyCode == "39") {
      changeSlide("right", sliderCon, sliders);
    }
  };
}
function changeSlide(direction, sliderCon, sliders) {
  var index = sliderCon.getAttribute("index");
  var sliderWidth = sliderCon.getBoundingClientRect().width - 12;
  if (direction == "left") {
    index--;
    if (index < 0) {
      index = sliders.length - 1;
    }
  } else if (direction == "right") {
    index++;
    if (index > sliders.length - 1) {
      index = 0;
    }
  }

  sliderCon.setAttribute("index", index);

  for (var i = 0; i < sliders.length; i++) {
    sliders[i].style.transform = "translateX(-" + index * sliderWidth + "px)";
  }
}

// set determination

if (sessionStorage.getItem("adminID")) {
  var musFam = Array();
  var musName = Array();
  var detDiv = document.querySelector(".admin-determination-con");
  var selected1 = document.querySelector(".select-div").querySelector("h3");
  var ulDivFamily = document.querySelector(".family-dropDown");
  var ulListFamily = ulDivFamily.querySelector("ul");
  var dropBtns = detDiv.querySelectorAll(".dropDown-det-btn");
  var speciesDiv = detDiv.querySelector(".set-species");
  var ulDivSpecies = detDiv.querySelector(".species-dropDown");
  var ulListSpecies = ulDivSpecies.querySelector("ul");
  var selected2 = document.querySelector(".set-species").querySelector("h3");
  var btnConfirm = document.querySelector(".btn-det-confirm");
  btnCLose = document.querySelector(".btn-close-det");
  var postID;

  var req1 = new XMLHttpRequest();
  req1.open("GET", "php/conn/setDetermination.php?det=fam");
  req1.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      var json = JSON.parse(this.response);
      json[0].forEach(function (e) {
        musFam.push(e);
      });
      json[1].forEach(function (e) {
        musName.push(e);
      });

      musFam.forEach((e) => {
        var li = document.createElement("li");
        li.innerHTML = e.name;
        li.addEventListener("click", function () {
          var fn = this.innerHTML;
          selected1.innerHTML = this.innerHTML;
          setTimeout(() => {
            ulDivFamily.style.visibility = "hidden";
            ulDivFamily.style.opacity = "0";
          }, 1);
          // for species
          dropBtns[1].style.display = "block";
          speciesDiv.addEventListener("click", function () {
            ulDivSpecies.style.visibility = "visible";
            ulDivSpecies.style.opacity = 1;
          });
          speciesForSelect = Array();
          ulListSpecies.innerHTML = "";
          musName.forEach(function (m) {
            if (m.fn == fn) {
              speciesForSelect.push(m.sn);
            }
          });
          speciesForSelect.forEach((e) => {
            var li2 = document.createElement("li");
            li2.innerHTML = e;
            li2.addEventListener("click", function () {
              selected2.innerHTML = this.innerHTML;
              setTimeout(() => {
                ulDivSpecies.style.visibility = "hidden";
                ulDivSpecies.style.opacity = "0";
              }, 1);
              btnConfirm.style.display = "block";
              btnConfirm.addEventListener("click", () =>
                confirmDetermination(selected1.innerHTML, selected2.innerHTML)
              );
            });
            ulListSpecies.appendChild(li2);
          });
        });
        ulListFamily.appendChild(li);
      });
    }
  };
  req1.send();
}

setDetermination = function () {
  postID = this.getAttribute("postID");
  detDiv.style.display = "block";
  // admin name
  detDiv.querySelector(".adm-det-name").innerHTML =
    sessionStorage.getItem("fname") + " " + sessionStorage.getItem("lname");

  // exit
  btnCLose.addEventListener("click", function () {
    detDiv.style.display = "none";
    dropDownF.style.visibility = "hidden";
    dropDownF.style.opacity = 0;
    ulDivSpecies.style.visibility = "hidden";
    ulDivSpecies.style.opacity = 0;
    selected1.innerHTML = "Род";
    selected2.innerHTML = "Врста";
    ulListSpecies.innerHTML = "";
    dropBtns[1].style.display = "none";
    btnConfirm.style.display = "none";
  });

  var dropDownF = detDiv.querySelector(".family-dropDown");

  var familyDiv = detDiv.querySelector(".set-family");

  dropBtns[0].addEventListener("click", function () {
    dropDownF.style.visibility = "visible";
    dropDownF.style.opacity = 1;
  });
  familyDiv.addEventListener("click", function () {
    dropDownF.style.visibility = "visible";
    dropDownF.style.opacity = 1;
  });
  dropBtns[1].addEventListener("click", function () {
    ulDivSpecies.style.visibility = "visible";
    ulDivSpecies.style.opacity = 1;
  });
};
function confirmDetermination(fn, sn) {
  var text = "Да ли сте сигурни?";
  if (confirm(text)) {
    var req = new XMLHttpRequest();
    req.open("POST", "php/conn/setDetermination.php?det=set");
    req.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        btnCLose.click();
        if (this.response == "success") {
          alert("Успешно!");
          const p = {
            aName: sessionStorage.getItem("fname"),
            aLname: sessionStorage.getItem("lname"),
            title: sessionStorage.getItem("title"),
            musFamily: fn,
            musName: sn,
            check: 0,
          };
          var divPosts = document.querySelectorAll(".post-div");
          var divPost;
          for (var i = 0; i < divPosts.length; i++) {
            if (divPosts[i].getAttribute("id") == postID) {
              divPost = divPosts[i];
              break;
            }
          }
          showDetermination(divPost, p);
        }
      }
    };
    var json = {
      pID: postID,
      fn: fn,
      sn: sn,
    };
    json = JSON.stringify(json);
    req.send(json);
  }
}
// confirmDetermination
function conDetermination(pID, divPost) {
  var text = "Желите да потврдите детерминацију?";
  if (confirm(text)) {
    var req = new XMLHttpRequest();
    req.open("POST", "php/conn/setDetermination.php?det=confirm");
    req.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (this.response == "error1") {
          alert("Ви сте поставили детерминацију, не можете да је потврдите!");
        } else if (this.response == "error2") {
          alert("Веч сте дали вашу потврду!");
        } else if (this.response == "success") {
          alert("Успешно сте потврдили детерминацију");
          var div = divPost.querySelector(".num-det-confirm");
          x = +div.innerHTML.substring(1) + 1;
          div.innerHTML = "x" + x;
        } else {
          alert("Грешка, покушајте поново");
        }
      }
    };
    req.send(pID);
  }
}
// show determination()
function showDetermination(divPost, p) {
  divPost
    .querySelector(".info-post-det")
    .querySelector(".fa-solid")
    .classList.replace("fa-circle-question", "fa-circle-check");
  divPost
    .querySelector(".info-post-det")
    .querySelector(".fa-solid").style.color = "#18aa47";
  divPost.querySelector(".determination-div").style.display = "flex";
  divPost.querySelector(".admin-name").innerHTML = p.aName + " " + p.aLname;
  divPost.querySelector(".admin-title").innerHTML = p.title;
  var nameMus = divPost.querySelector(".det-species-name");
  nameMus.innerHTML = p.musFamily + " " + p.musName;
  if (sessionStorage.getItem("adminID")) {
    divPost.querySelector(".set-determination").style.display = "none";
  }

  nameMus.addEventListener("click", () => {
    sessionStorage.setItem("fn", p.musFamily);
    sessionStorage.setItem("sn", p.musName);
    window.open("species.php", "_self");
  });
  divPost.querySelector(".num-det-confirm").innerHTML = "x" + (+p.check + 1);
  // doesn't work, when call from setDetermination. img doesn't shows up???? for no reason?????!!!!?!?!?!?!??!
  var imgAd = divPost.querySelector(".det-icon-admin");
  for (var i = 0; i < admins.length; i++) {
    if (
      String(p.aName) == String(admins[i]["fname"]) &&
      String(p.aLname) == String(admins[i]["lname"])
    ) {
      imgAd.style.backgroundImage = "url(" + admins[i]["img"] + ")";

      break;
    }
  }
}
// delete post
function deletePost(div, text) {
  if (confirm(text)) {
    var req = new XMLHttpRequest();
    req.open("POST", "php/conn/deletePost.php");
    req.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
        if (this.response == "success") {
          alert("Успешно сте обрисали пост.");
          div.remove();
        } else {
          alert("Грешка, покушајте поново!");
        }
      }
    };
    req.send(div.getAttribute("id"));
  }
}

var heightOfComments = Array();

function seeComments(div) {
  var commDiv = div.querySelector(".post-comments-div");
  if (commDiv.getBoundingClientRect().height < 73) {
    var check = 0;
    // when use line under, transition doesent'work
    // commDiv.style.height = "max-content";
    var numOfComments = div.querySelector(".num-mess").innerHTML;

    if (numOfComments == 0) {
      if (
        sessionStorage.getItem("userID") ||
        sessionStorage.getItem("adminID")
      ) {
        commDiv.querySelector(".com-input-text-div").style.display = "block";
        commDiv.style.height = "148px";
        div
          .querySelector(".btn-con-send")
          .addEventListener("click", () => addComment(commDiv));
      } else {
        alert("Објава још нема ниједан коментар.");
      }
    } else if (numOfComments > 0) {
      var req = new XMLHttpRequest();
      req.open("POST", "php/conn/comments.php?com=get");

      req.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
          var json = JSON.parse(this.response);
          let ch = json.map(async function (e) {
            return new Promise((resolve) => {
              fillComments(e, commDiv);
              check++;
              if (check == json.length) {
                resolve;
              }
            });
          });
          Promise.all(ch).then(setHeightComments(commDiv));
        }
      };

      req.send(div.getAttribute("id"));
    }
  }
}

var divCom = document.querySelector(".post-comms-div");
// for height of comments;

// fill comments
function fillComments(c, cDiv) {
  var NdivCom = divCom.cloneNode(true);
  NdivCom.setAttribute("id", c.comID);
  var cId;
  if (c.uID) {
    cId = c.uID;
  } else {
    cId = c.aID;
  }
  NdivCom.setAttribute("cID", cId);

  var comImg = NdivCom.querySelector(".com-creator-img");
  var comI = NdivCom.querySelector(".com-creator-icon");
  if (c.img) {
    comI.style.display = "none";
    comImg.style.backgroundImage = "url(" + c.img + ")";
  } else {
    var firstL = c.creatorName.charAt(0).toLocaleLowerCase();
    var checkLatin = /^[šđčćžшђчћжљњџертзуиопасдфгхјклџцвбнм]$/;
    if (firstL.match(checkLatin)) {
      // need to made convertor from cyrillic to latin, or made icon and set imgs
      if (firstL.charCodeAt(0) == 1084) {
        firstL = "m";
      } else {
        var x = firstL.charCodeAt(0);
        x = x - 1006;
        firstL = String.fromCharCode(x);
      }
    }
    comI.classList.replace("fa-a", "fa-" + firstL);
  }
  NdivCom.style.display = "flex";
  NdivCom.querySelector(".com-fname").innerHTML = c.creatorName;
  NdivCom.querySelector(".com-lname").innerHTML = c.creatorLname;
  if (c.title == "da") {
    NdivCom.querySelector(".com-title").innerHTML = "члан";
  } else if (c.title == "ne") {
    NdivCom.querySelector(".com-title").innerHTML = "корисник";
  } else {
    NdivCom.querySelector(".com-title").innerHTML = c.title;
  }

  NdivCom.querySelector(".com-creator-text").innerHTML = c.text;
  cDiv.appendChild(NdivCom);
  var comHeight = NdivCom.querySelector(".com-creator-text").offsetHeight;
  setHComments(cDiv.parentElement.getAttribute("id"), comHeight + 2);

  if (comHeight > 70) {
    NdivCom.style.minHeight = comHeight + "px";
    NdivCom.style.height = comHeight + "px";
  }
  // for comments change or delete
  var btnChange = NdivCom.querySelector(".btn-change-com");
  if (sessionStorage.getItem("adminID")) {
    btnChange.style.display = "block";
    btnChange.addEventListener("click", () => comChange(NdivCom));
  } else if (sessionStorage.getItem("userID")) {
    if (sessionStorage.getItem("userID") == c.uID) {
      console.log(sessionStorage.getItem("userID"));
      btnChange.style.display = "block";
      btnChange.addEventListener("click", () => comChange(NdivCom));
    }
  }
}

let setHeightComments = function (div) {
  if (sessionStorage.getItem("userID") || sessionStorage.getItem("adminID")) {
    var inputTextDiv = div.querySelector(".com-input-text-div");
    inputTextDiv.style.display = "block";
    div.appendChild(inputTextDiv);

    setHComments(div.parentElement.getAttribute("id"), 74);
    div
      .querySelector(".btn-con-send")
      .addEventListener("click", () => addComment(div));
  }
  if (getHComments(div.parentElement.getAttribute("id")) > 450) {
    div.style.height = "450px";
    div.style.overflowY = "scroll";
  } else {
    div.style.height =
      getHComments(div.parentElement.getAttribute("id")) + "px";
  }
};

function addComment(div) {
  var pId = div.parentElement.getAttribute("id");
  var text = div.querySelector(".input-text").value;
  if (text.length > 0) {
    var json = {
      pid: pId,
      text: text,
    };
    json = JSON.stringify(json);

    var req = new XMLHttpRequest();
    req.open("POST", "php/conn/comments.php?com=add");
    req.send(json);
    req.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (this.response != "error") {
          var newCom = div.querySelector(".post-comms-div").cloneNode(true);
          newCom.setAttribute("id", this.response);
          if (sessionStorage.getItem("userID")) {
            newCom.setAttribute("cid", sessionStorage.getItem("userID"));
          } else if (sessionStorage.getItem("adminID")) {
            newCom.setAttribute("cid", sessionStorage.getItem("adminID"));
          }
          newCom.querySelector(".com-fname").innerHTML =
            sessionStorage.getItem("fname");
          newCom.querySelector(".com-lname").innerHTML =
            sessionStorage.getItem("lname");
          var title;
          if (sessionStorage.getItem("member")) {
            var mem = sessionStorage.getItem("member");
            if ((mem = "ne")) {
              title = "корисник";
            } else {
              title = "члан";
            }
          } else {
            title = sessionStorage.getItem("title");
          }
          var btnChange = newCom.querySelector(".btn-change-com");
          btnChange.style.display = "block";
          btnChange.addEventListener("click", () => comChange(newCom));

          newCom.querySelector(".com-title").innerHTML = title;
          var textDiv = newCom.querySelector(".com-creator-text");
          textDiv.innerHTML = text;

          setTimeout(() => {
            setHComments(
              div.parentElement.getAttribute("id"),
              textDiv.offsetHeight
            );
            if (getHComments(div.parentElement.getAttribute("id")) > 450) {
              div.style.height = 450 + "px";
              div.style.overflowY = "scroll";
            } else {
              div.style.height =
                getHComments(div.parentElement.getAttribute("id")) + "px";
            }
          }, 0);

          var x = +div.querySelector(".num-mess").innerHTML + +1;
          div.querySelector(".num-mess").innerHTML = x;

          newCom.style.display = "flex";
          div.insertBefore(newCom, div.children[div.children.length - 1]);
          div.querySelector(".input-text").value = "";
        } else {
          alert("Грешка! покушајте поново");
        }
      }
    };
  } else {
    alert("Нисте написали коментар.");
  }
}

function setHComments(id, h) {
  for (var i = 0; i < heightOfComments.length; i++) {
    if (heightOfComments[i].id == id) {
      heightOfComments[i].height = +heightOfComments[i].height + +h;
      break;
    }
  }
}
function getHComments(id) {
  for (var i = 0; i < heightOfComments.length; i++) {
    if (heightOfComments[i].id == id) {
      return heightOfComments[i].height;
    }
  }
}

function comChange(div) {
  var changeDiv = document.querySelector(".com-change-div");
  if (sessionStorage.getItem("adminID")) {
    if (sessionStorage.getItem("adminID") != div.getAttribute("cid")) {
      changeDiv.querySelector(".com-change-btn").style.display = "none";
      changeDiv.querySelector(".com-change-st").style.display = "none";
    } else {
      changeDiv.querySelector(".com-change-btn").style.display = "block";
      changeDiv.querySelector(".com-change-st").style.display = "block";
    }
  }
  divChforExit = div;
  var top = div.getBoundingClientRect().top;
  var right = div.getBoundingClientRect().right;

  changeDiv.style.display = "flex";
  changeDiv.style.top = top + +40 + "px";
  changeDiv.style.left = right + "px";

  div.parentElement.addEventListener("scroll", hideChangeDiv);

  var wall = document.querySelector(".wall-container");
  wall.addEventListener("scroll", hideChangeDiv);

  document.addEventListener("click", hideChangeDivOnClick);

  // delete com
  var btnDelCom = changeDiv.querySelector(".com-delete-btn");
  btnDelCom.addEventListener("click", deleteComment);
}
var divChforExit;

let hideChangeDiv = function () {
  var changeDiv = document.querySelector(".com-change-div");
  changeDiv.style.display = "none";
  var wall = document.querySelector(".wall-container");
  wall.removeEventListener("scroll", hideChangeDiv);
  if (divChforExit != null) {
    divChforExit.parentElement.removeEventListener("scroll", hideChangeDiv);
  }
};

let hideChangeDivOnClick = function (event) {
  if (!divChforExit.contains(event.target)) {
    var changeDiv = document.querySelector(".com-change-div");
    setTimeout(() => {
      changeDiv.style.display = "none";
    }, 100);
    document.removeEventListener("click", hideChangeDivOnClick);
  }
};

var deleteComment = () => {
  if (confirm("Да ли сте сигурни?")) {
    var req = new XMLHttpRequest();
    req.open("POST", "php/conn/comments.php?com=del");
    var id = divChforExit.getAttribute("id");
    req.send(id);
    req.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        if (this.response == "success") {
          var height = divChforExit.offsetHeight;
          var id = divChforExit.parentElement.parentElement.getAttribute("id");
          setHComments(id, -height);
          var newH = getHComments(id);
          if (newH < 450) {
            divChforExit.parentElement.style.overflowY = "hidden";
            divChforExit.parentElement.style.height = newH - 2 + "px";
          }

          divChforExit.style.display = "none";
        } else {
          alert("Грешка, покушајте поново!");
        }
      }
    };
  }
  var btnDelCom = document.querySelector(".com-delete-btn");
  btnDelCom.removeEventListener("click", deleteComment);
};
