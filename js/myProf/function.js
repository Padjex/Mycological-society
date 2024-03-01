if (sessionStorage.getItem("userID")) {
  function getUserInfo() {
    var req = new XMLHttpRequest();
    req.open("POST", "php/conn/getMemberInfo.php");
    req.send();
    req.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
        var json = this.response;
        json = JSON.parse(json);
        fillUser(json[0]);
        json[1].forEach(function (e) {
          fillData(e);
        });
      }
    };
  }
  getUserInfo();
  function fillData(d) {
    var divToFill = divToClone.cloneNode(true);
    divToFill.style.display = "flex";
    divToFill.querySelector(".fm-name").innerHTML = d.fn;
    divToFill.querySelector(".sp-name").innerHTML = d.sp;
    divToFill.setAttribute("fn", d.fn);
    divToFill.setAttribute("sp", d.sp);

    var url =
      d["img"] + "/" + d.fn.charAt(0).toLowerCase() + d.sp.charAt(0) + "1.jpg";
    var favImg = divToFill.querySelector(".img-favorite");
    favImg.style.backgroundImage = "url(" + url + ")";

    var btnD = divToFill.querySelector(".btn-delete");
    btnD.addEventListener("click", () => deleteFavMus(divToFill));
    listDiv.appendChild(divToFill);
  }
  function fillUser(d) {
    document.querySelector(".user-name").innerHTML = d["fname"];
    document.querySelector(".user-lname").innerHTML = d["lname"];
    document.querySelector(".e-adresa").innerHTML = d["email"];
    document.querySelector(".member-date").innerHTML = d["date"];
    document.querySelector(".member-of-group").innerHTML = d["mem"];
  }

  // delete favorite mushroom
  function deleteFavMus(div) {
    var fn = div.getAttribute("fn");
    var sp = div.getAttribute("sp");
    var id = sessionStorage.getItem("userID");

    var req = new XMLHttpRequest();
    req.open("POST", "php/conn/addRemoveFav.php?fav=true");
    var json = {
      id: id,
      fn: fn,
      sp: sp,
    };
    json = JSON.stringify(json);
    req.send(json);
    req.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
        if (this.response == "true") {
          var t = "Да ли сте сигурни?";
          if (confirm(t) == true) {
            div.remove();
          }
        }
      }
    };
  }
  var divToClone = document.querySelector(".favorite-li");
  var listDiv = document.querySelector(".list-favorites");
} else if (sessionStorage.getItem("adminID")) {
  function getAdminInfo() {
    var req = new XMLHttpRequest();
    req.open("POST", "php/conn/getAdminInfo.php");
    req.send();
    req.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
        var json = this.response;
        json = JSON.parse(json);
        fillAdmin(json);
      }
    };
  }
  getAdminInfo();

  function fillAdmin(d) {
    document.querySelector(".user-name").innerHTML = d["fname"];
    document.querySelector(".user-lname").innerHTML = d["lname"];
    document.querySelector(".e-adresa").innerHTML = d["email"];
    document.querySelector(".admin-date").innerHTML = "Члан друштва од:";
    document.querySelector(".member-date").innerHTML = d["date"];

    var title = d.title;
    if (title == "determinator") {
      title = "Детерминатор";
    } else if (title == "mentor") {
      title = "Ментор";
    } else {
      title = "Гљивар";
    }
    document.querySelector(".admin-title").innerHTML += title;
    var url = d["img"];
    document.querySelector(".user-Img").style.backgroundImage =
      "url(" + url + ")";

    document.querySelector(".btn-set-Img").style.display = "none";

    document.querySelector(".det-num").innerHTML += d["detNum"];
  }
  function fillUser() {
    tbody.innerHTML = "";
    var req = new XMLHttpRequest();
    req.open("POST", "php/conn/getUsers.php");
    req.send();
    req.onreadystatechange = function () {
      if (this.status == 200 && this.readyState == 4) {
        var json = this.response;
        json = JSON.parse(json);
        json.forEach(function (e) {
          fillTable(e);
        });
      }
    };
  }

  var tbody = document.querySelector("tbody");
  function fillTable(d) {
    var tr = document.createElement("tr");

    var tdID = document.createElement("td");
    tdID.innerHTML = d["id"];
    tr.appendChild(tdID);

    var tdname = document.createElement("td");
    tdname.innerHTML = d["fname"] + " " + d["lname"];
    tr.appendChild(tdname);

    // button ADD
    var tdAction = document.createElement("td");
    tdAction.classList.add("td-action");

    var btnAdd = document.createElement("button");
    btnAdd.classList.add("btn-addMem");
    btnAdd.classList.add("action-btn");
    btnAdd.setAttribute("id", d.id);
    if (d.member == "ne") {
      btnAdd.innerHTML = "Додај у тим";
      btnAdd.addEventListener("click", () => addNewMem(btnAdd));
    } else {
      btnAdd.innerHTML = "Члан друштва";
    }

    tdAction.appendChild(btnAdd);

    var btnDel = document.createElement("button");
    btnDel.classList.add("btn-delMem");
    btnDel.classList.add("action-btn");
    btnDel.setAttribute("id", d.id);
    btnDel.innerHTML = "X";
    btnDel.addEventListener("click", () => banUser(btnDel));
    tdAction.appendChild(btnDel);

    tr.appendChild(tdAction);

    tbody.appendChild(tr);
  }
  fillUser();

  function banUser(btnDel) {
    var t = "Да ли сте сигурни?";
    if (confirm(t)) {
      var req = new XMLHttpRequest();
      req.open("POST", "php/conn/addBanUser.php?addMem=false");
      req.send(btnDel.getAttribute("id"));
      req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          if (this.response == "true") {
            fillUser();
          } else {
            alert("Покушајте поново!");
          }
        }
      };
    }
  }
}
function addNewMem(btn) {
  var req = new XMLHttpRequest();
  req.open("POST", "php/conn/addBanUser.php?addMem=true");
  req.send(btn.getAttribute("id"));
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.response == "true") {
        alert("Успешно сте додали члана друштва!");
        btn.innerHTML = "Члан друштва";
      } else {
        alert("Грешка, покушајте поново!");
      }
    }
  };
}
