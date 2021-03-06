import store from "./store";

const url = "https://thinkful-list-api.herokuapp.com/rohit/bookmarks";

function getAllBookmarks() {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      store.error = err;
    });
}

function addBookmark(bookmark) {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(bookmark),
  })
    .then((res) => res.json())
    .catch((err) => {
      store.error = err;
    });
}

function deleteBookmark(id) {
  return fetch(url + "/" + id, {
    method: "DELETE",
  }).catch((err) => {
    store.error = err;
  });
}

export default { getAllBookmarks, addBookmark, deleteBookmark };
