import $ from "jquery";
import api from "./api";
import "./styles.css";
import store from "./store";
import templates from "./templates";

function removeBookmark(id) {
  api.deleteBookmark(id).then((res) => {
    api.getallBookmarks().then((res) => {
      store.updateBookmark(res);
      render();
    });
  });
}

function addevents() {
  $("main").unbind();
  if (store.adding) {
    $("#cancel").on("click", function () {
      store.stopadding();
      render();
    });
    $("#addbookmark").on("submit", function (evt) {
      evt.preventDefault();
      addBookMarkToApi();
    });
  } else if (store.error != null) {
    $("#back").on("click", function () {
      store.stopadding();
      render();
    });
  } else {
    $("#addform").on("click", function () {
      store.addform();
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
    store.stopadding();
    api.getallBookmarks().then((res) => {
      store.updateBookmark(res);
      render();
    });
  });
}

function render() {
  $("main").html("<h1>My Bookmarks</h1>");
  switch (store.status()) {
    case "Adding":
      $("main").append(templates.addbookmarkform());
      break;
    case "Error":
      $("main").append(templates.error());
      break;
    default:
      $("main").append(templates.ShowBookmarks());
      break;
  }
  addevents();
}

export default {
  render,
  addBookMarkToApi,
  toggle,
  removeBookmark,
};
