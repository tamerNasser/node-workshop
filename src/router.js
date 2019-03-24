const fs = require("fs");
const path = require("path");
const handler = require("./handlers");

const router = (request, response) => {
  const url = request.url;

  if (url === "/") {
    handler.handleHome(response, true);
  } else if (url.indexOf(".") !== -1) {
    handler.handlePublic(response, url);
  } else if (url === "/create/post") {
    handler.handleForm(response, request);
  } else {
    handler.handleHome(response, false);
  }
};

module.exports = router;
