const http = require("http");
const fs = require("fs");
const path = require("path");

let message = "I am so happy to be part of the Node not Girls workshop!";

const handler = (request, response) => {
  const url = request.url;
  let filePath;

  if (url === "/") {
    filePath = path.join(__dirname, "..", "public", "index.html");

    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(500);
        response.end("500 error not found");
      } else {
        response.writeHead(200, {
          "Content-Type": "text/html"
        });
        response.end(file);
      }
    });
  } else if(url === "/img/image.jpg"){

    filePath = path.join(__dirname, "..", "public", "img", "image.jpg");
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(500);
        response.end("500 error not found");
      } else {
        response.writeHead(200, {
          "Content-Type": "text/html"
        });
        response.end(file);
      }
    });

  } else if(url == "/main.css"){
    filePath = path.join(__dirname, "..", "public", "main.css");
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(500);
        response.end("500 error not found");
      } else {
        response.writeHead(200, {
          "Content-Type": "text/css"
        });
        response.end(file);
      }
    });
  }
  else {
    response.writeHead(404);
    response.end("404 error not found");
  }
};

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log("Server is listening on port 3000.  Ready to accept requests!");
});
