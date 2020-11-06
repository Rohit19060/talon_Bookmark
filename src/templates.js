import star from "./assets/star.svg";
import $ from "jquery";
import api from "./api";
import functions from "./functions";
import store from "./store";

function addbookmarkform() {
  return `<form id="addbookmark">
  <h2>Add Bookmark</h2>
      <div class="inputdiv">
      <label for="title">Title: </label>
      <input type="text" name="title" id="title" required>
      </div>
      <div class="inputdiv">
      <label for="title">Url: </label>
      <input type="url" name="url" id="url" required>
      </div>
      <div class="inputdiv">
      <label for="title">Description: </label>
      <input type="text" name="desc" id="desc" required>
      </div>
      <br>
      Rating: <select name="rating" id="rating">
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
      </select>
     <br>
      <button type="submit" value="Submit" >Submit</button> 
      <button id="cancel">Cancel</button>
  </form>`;
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

  $("main").append(div);

  $(`button#${bookmark.id}`).on("click", function () {
    functions.removeBookmark(bookmark.id);
  });

  $(`div#${bookmark.id}`).on("click", function () {
    functions.toggle(bookmark.id);
  });
}

function ShowBookmarks() {
  let data = `<button id="addform">+ New</button><span class="text">Filter By:</span>`;
  data += `<select id="filter">`;
  for (let i = 1; i <= 5; i++) {
    data += `<option value="${i}" `;
    if (i == store.filter) {
      data += "selected";
    }
    data += `>${i}</option>`;
  }
  data += ` </select>`;

  $("main").append(data);

  store.bookmarks.forEach((element) => {
    if (element.rating >= store.filter) {
      bookmark(element);
    }
  });
}

function error() {
  return `<div>
  <p>${store.error}</p>
  <button id="back">Back</button>
  </div>`;
}

export default {
  ShowBookmarks,
  addbookmarkform,
  error,
};
