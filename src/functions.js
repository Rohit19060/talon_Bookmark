import $ from "jquery";
import api from "./api";
import "./styles.css";
import store from "./store";
import templates from "./templates";

function removeBookmark(id) {
  api.deleteBookmark(id).then((res) => {
    api.getAllBookmarks().then((res) => {
      store.updateBookmark(res);
      render();
    });
  });
}

function addEvents() {
  $("main").unbind();
  if (store.adding) {
    $("#cancel").on("click", function () {
      store.stopPadding();
      render();
    });
    $("#addBookmark").on("submit", function (evt) {
      evt.preventDefault();
      addBookMarkToApi();
    });
  } else if (store.error != null) {
    $("#back").on("click", function () {
      store.stopPadding();
      render();
    });
  } else {
    $("#addForm").on("click", function () {
      store.addForm();
      render();
    });
    $("#filter").on("change", function (event) {
      store.filter = $("#filter").val();
      render();
    });
  }
}

function toggle(id) {
  $(`#${id}`).next("span").toggleClass("hidden");
}

function addBookMarkToApi() {
  let send = {
    title: $("#title").val(),
    url: $("#url").val(),
    desc: $("#desc").val(),
    rating: $("#rating").val(),
  };

  api.addBookmark(send).then((data) => {
    store.stopPadding();
    api.getAllBookmarks().then((res) => {
      store.updateBookmark(res);
      render();
    });
  });
}

function render() {
  $("main").html("<h1>My Bookmarks</h1>");
  switch (store.status()) {
    case "Adding":
      $("main").append(templates.addBookmarkForm());
      break;
    case "Error":
      $("main").append(templates.error());
      break;
    default:
      $("main").append(templates.ShowBookmarks());
      break;
  }
  addEvents();
}

export default {
  render,
  addBookMarkToApi,
  toggle,
  removeBookmark,
};
