// Upload imgs
var divUpload = document.querySelector(".upload-div");
var btnAddImg = document.querySelector(".btn-add-img");
btnAddImg.addEventListener("click", () => addImgs());

var btnGiveUp = document.querySelector(".btnGiveUp");
btnGiveUp.addEventListener("click", () => {
  // doesn't work??!! when I change class, click is triggered
  // divUpload.classList.remove("show");
  // br = 0;

  // not good slution

  imgsForUpload = Array();
  window.open("wallAsk.php", "_SELf");
});
var br = 0;

function addImgs() {
  divUpload.classList.add("show");
  if (br == 0) {
    divUpload.addEventListener("webkitTransitionEnd", () => {
      document.querySelector("#selectedFile").click();
      btnGiveUp.style.display = "block";
    });
    br++;
  } else {
    document.querySelector("#selectedFile").click();
  }
}

// get Img or Name for icon
var icon = document.querySelector(".userF");
var firstL = sessionStorage.getItem("fname").charAt(0).toLocaleLowerCase();
icon.classList.add("fa-" + firstL);

// admin IMG
function setImgAdmin(id) {
  icon.style.display = "none";
  for (var i = 0; i < admins.length; i++) {
    if (admins[i].id == id) {
      var img = admins[i].img;
      document.querySelector(".user-img").style.backgroundImage =
        "url(" + img + ")";
    }
  }
}

// add img for preview
var inpImg = document.querySelector("#selectedFile");
inpImg.value = "";
inpImg.addEventListener("change", () => fillPostImgs());

var box1 = document.querySelector(".box1");
var box2 = document.querySelector(".box2");
var box3 = document.querySelector(".box3");

var boxes = [box1, box2, box3];

box1.setAttribute("img", "false");
box2.setAttribute("img", "false");
box3.setAttribute("img", "false");

var imgsForUpload = Array();

function fillPostImgs() {
  var files = inpImg.files;
  for (var i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      var urlImg = this.result;
      // if use foreach loop, urlImg is always the last url of array??!!??!
      for (var j = 0; j < boxes.length; j++) {
        if (boxes[j].getAttribute("img") == "false") {
          boxes[j].setAttribute("img", "true");
          boxes[j].style.backgroundImage = "url(" + urlImg + ")";
          break;
        }
      }
    });
    reader.readAsDataURL(files[i]);
    imgsForUpload.push(files[i]);
  }
  if (imgsForUpload.length > 3) {
    document.querySelector(".count-of-imgs-div").querySelector("p").innerHTML =
      "+" + (imgsForUpload.length - +3);
  }
}

// send imgs and data for new post
var btnSendImg = document.querySelector(".btn-upload");
btnSendImg.addEventListener("click", () => sendPost());

function sendPost() {
  // text from input
  var queryInput = document.querySelector(".question-text");
  var query = queryInput.value;

  var formData = new FormData();
  for (var i = 0; i < imgsForUpload.length; i++) {
    formData.append("file[]", imgsForUpload[i]);
  }
  var req = new XMLHttpRequest();
  req.open("POST", "php/conn/addPost.php?text=" + query, true);
  req.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      if (this.response == "success") {
        alert("Успешно!");
        window.open("wallAsk.php", "_SELF");
      } else if (this.response == "needText") {
        alert("Морате додати неки опис уз слике!");
      } else if (this.response == "errorImg") {
        alert("Слике нису у подржаном формату.");
      } else {
        console.log(this.response);
        alert("Greška, pokušajte ponovo.");
      }
    }
  };
  req.send(formData);
}
