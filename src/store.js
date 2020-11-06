let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

function status() {
  if (this.adding) {
    return "Adding";
  } else if (this.error != null) {
    return "Error";
  } else {
    return "Bookmark";
  }
}

function updateBookmark(bookmarks) {
  this.bookmarks = [];
  bookmarks.forEach((element) => {
    this.bookmarks.push(element);
  });
}

function addform() {
  this.adding = true;
}

function stopadding() {
  this.adding = false;
}

export default {
  status,
  stopadding,
  updateBookmark,
  bookmarks,
  addform,
  filter,
};
