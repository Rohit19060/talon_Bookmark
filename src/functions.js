import $ from "jquery";
import star from "./assets/star.svg";
import api from "./api";
import "./styles.css";

let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

function removeBookmark(id) {
  api.deleteBookmark(id).then((res) => {
    api.getallBookmarks().then((res) => {
      showbookmarks(res, 0);
    });
  });
}

function toggle(id) {
  $(`#${id}`).next("span").toggleClass("hidden");
}

function select(filter) {
  let select = ` <span class="text">Filter By:</span><select id="filter">
  <option value="1" `;
  if (filter == 1) {
    select += `selected`;
  }
  select += `>1</option>
  <option value="2" `;
  if (filter == 2) {
    select += `selected`;
  }
  select += `>2</option>
  <option value="3" `;
  if (filter == 3) {
    select += `selected`;
  }
  select += `>3</option>
  <option value="4" `;
  if (filter == 4) {
    select += `selected`;
  }
  select += `>4</option>
  <option value="5" `;
  if (filter == 5) {
    select += `selected`;
  }
  select += `>5</option>
</select>`;
  return select;
}

function showbookmarks(bookmarks, filter = 0) {
  let section = document.createElement("Section");
  section.id = "mainlist";

  let addformButton = document.createElement("button");
  addformButton.innerText = "+ New";
  addformButton.addEventListener("click", function () {
    addbookmarkform(bookmarks);
  });

  $("body").html(section);

  $("#mainlist").html("<h1>My Bookmarks</h1>");
  $("#mainlist").append(addformButton);
  $("#mainlist").append(select(filter));

  bookmarks.forEach((element) => {
    if (element.rating >= filter) {
      bookmark(element);
    }
  });

  $("#filter").on("change", function (event) {
    showbookmarks(bookmarks, $("#filter").val());
  });
}

function bookmark(bookmark) {
  let div = `<section class="bookmark"><div id="${bookmark.id}" class="mainview"><span class="h2">${bookmark.title}</span>`;
  div += `<span>`;
  for (let i = 0; i < bookmark.rating; i++) {
    div += `<img src="${star}" width="15px" alt="star"/>`;
  }
  div += `</span></div>
    <span class="hidden"><div class="h2 mb-3">${bookmark.desc}</div>
   <div class="hiddenview"> <a href="${bookmark.url}" target="_blank"><button>Visit Link</button></a>
   <button id="${bookmark.id}">Remove</button></div>
    </span></section>`;

  $("#mainlist").append(div);

  $(`button#${bookmark.id}`).on("click", function () {
    removeBookmark(bookmark.id);
  });

  $(`div#${bookmark.id}`).on("click", function () {
    toggle(bookmark.id);
  });
}

function addbookmarkform(bookmarks) {
  let form = `<form id="addbookmark">
    <label for="title">Title: </label>
    <input type="text" name="title" id="title" required>
    <label for="title">Url: </label>
    <input type="url" name="url" id="url" required>
    <label for="title">Description: </label>
    <input type="text" name="desc" id="desc" required>
    <select name="rating" id="rating">
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
    </select>
    <input type="submit" value="submit" /> 
</form>`;
  $("#mainlist").html(form);
  let addCancleButton = document.createElement("button");
  addCancleButton.innerText = "Cancel";
  addCancleButton.addEventListener("click", function () {
    cancel(bookmarks);
  });
  $("#mainlist").append(addCancleButton);
  $("#addbookmark").on("submit", function (evt) {
    evt.preventDefault();

    addBookMarkToApi();
  });
}

function addBookMarkToApi() {
  let send = {
    title: $("#title").val(),
    url: $("#url").val(),
    desc: $("#desc").val(),
    rating: $("#rating").val(),
  };

  api.addBookmark(send).then((data) => {
    if (data.title == null) {
      alert(data.message);
    } else {
      api.getallBookmarks().then((res) => {
        showbookmarks(res, 0);
      });
    }
  });
}

function cancel(bookmarks) {
  showbookmarks(bookmarks, 0);
}

export default {
  showbookmarks,
};
