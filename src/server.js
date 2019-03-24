const http = require('http');


let message = 'I am so happy to be part of the Node not Girls workshop!';

function handler(request, response) {
  response.writeHead(200, {
    "Content-Type": "text/html"
  });
  response.write(message); //response body
  response.end(); // finish response
}

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log("Server is listening on port 3000.  Ready to accept requests!");
});
