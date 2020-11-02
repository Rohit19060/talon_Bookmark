import api from "./api";
import functions from "./functions";

api.getallBookmarks().then((res) => {
  functions.showbookmarks(res, 0);
});
