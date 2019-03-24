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
  },
  js: {
    "Content-Type": "application/javascript"
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
    // console.log(convertedData);
    // console.log(allTheData);
    let timestamp = Date.now();
    let postmsg = convertedData["post"];

    console.log(convertedData["post"]);
    let currentblogs = {};
    filePath = path.join(__dirname, "posts.json");
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(500);
        response.end(error500);
      } else {
        // console.log(JSON.parse(file));
        Object.assign(currentblogs, JSON.parse(file));
        currentblogs[timestamp] = postmsg;
        fs.writeFile("./src/posts.json", JSON.stringify(currentblogs), error => {
          if (error) {
            console.log(error);
          } else {
            response.writeHead(302, {
              Location: "/"
            });
            response.end();
          }

          // response.end(file);
        });
      }
      console.log(currentblogs);
    });
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

const handlePosts = (response, request) => {
  filePath = path.join(__dirname, "posts.json");
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500);
      response.end(error500);
    } else {
      // console.log(JSON.parse(file));
      response.writeHead(200,{"content-type":"application/json"});
      response.end(file);
    }
  });
};

module.exports = {
  handleHome,
  handleForm,
  handlePublic,
  handlePosts
};
