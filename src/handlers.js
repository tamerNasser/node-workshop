const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

let filePath;
const error500 = "500 error not found";
const error404 = "404 error not found";

let exType = {
  html: {
    "Content-Type": "text/html"
  },
  jpg: {
    "Content-Type": "text/html"
  },
  css: {
    "Content-Type": "text/css"
  }
};

const handleHome = (response, found) => {
  if (!found) {
    response.writeHead(404);
    response.end(error404);
  } else {
    filePath = path.join(__dirname, "..", "public", "index.html");

    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(500);
        response.end(error500);
      } else {
        response.writeHead(200, exType.html);
        response.end(file);
      }
    });
  }
};

const handleForm = (response, request) => {
  let allTheData = "";
  request.on("data", function(chunkOfData) {
    allTheData += chunkOfData;
  });

  request.on("end", function() {
    let convertedData = querystring.parse(allTheData);
    console.log(convertedData);
    response.writeHead(302, { Location: "/" });
    response.end();
  });
};

const handlePublic = (response, url) => {
  let extension = url.split(".")[1];

  filePath = path.join(__dirname, "..", "public", url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500);
      response.end(error500);
    } else {
      response.writeHead(200, exType.extension);
      response.end(file);
    }
  });
};

module.exports = { handleHome, handleForm, handlePublic };
