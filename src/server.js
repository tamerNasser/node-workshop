const http = require("http");
const fs = require("fs");
const path = require("path");

let message = "I am so happy to be part of the Node not Girls workshop!";

const handler = (request, response) => {
  const url = request.url;
  let filePath = path.join(__dirname, "..", "public", "index.html");

  if (url === "/") {
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(500);
        response.end("500 error not found");
      } else {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(file);
      }
    });
  }
};

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log("Server is listening on port 3000.  Ready to accept requests!");
});
