const http = require("http");
const fs = require("fs");

let message = "I am so happy to be part of the Node not Girls workshop!";

const handler = (request, response) => {
  const url = request.url;

  if (url === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });

    fs.readFile(__dirname + "/public/index.html", (error, file) => {
      if (error) {
        response.writeHead(500);
        response.end("500 error not found");
      } else {
        response.end(file);
      }
    });
  }
};

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log("Server is listening on port 3000.  Ready to accept requests!");
});
