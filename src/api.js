const url = "https://thinkful-list-api.herokuapp.com/talon/bookmarks";

function getallBookmarks() {
  return fetch(url).then((res) => res.json());
}

function addBookmark(bookmark) {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(bookmark),
  }).then((res) => res.json());
}

function deleteBookmark(id) {
  return fetch(url + "/" + id, {
    method: "DELETE",
  });
}

export default { getallBookmarks, addBookmark, deleteBookmark };
