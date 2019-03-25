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
    "Content-Type": "text/jpeg"
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
    let filePath = path.join(__dirname, "..", "public", "index.html");

    fs.readFile(filePath, (error, file) => { //// TODO:  Sync
      if (error) {
        response.writeHead(500);
        response.end(error500);
      } else {
        response.writeHead(200, exType.html);
        response.end(file);
      }
    });
    //handler.handlePosts(response,request);
  }
};

const handleForm = (response, request) => {
  let data = ''
  request.on('data', (chunk) => {
    data += chunk
  })
  request.on('end', () => {
    let newPost = querystring.parse(data)
    fs.readFile(__dirname + '/posts.json', (error, file) => {
      if (error) {
        console.log(error)
        return
      }
      let blogposts = JSON.parse(file)
      let currentTime = Date.now()
      blogposts[currentTime] = newPost.post

      fs.writeFile(__dirname + '/posts.json', JSON.stringify(blogposts, null, 4), function(error) {
        if (error) {
          console.log(error)
        }
        response.writeHead(302, {
          "Location": "/"
        })
        response.end()
      })
    })
  })
  return
};

const handlePublic = (response, url) => {
  let extension = url.split(".")[1];

  let filePath = path.join(__dirname, "..", "public", url);
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
  response.writeHead(200, {'Content-Type': 'application/json'})
     fs.readFile(__dirname + '/posts.json', (error, file) => {
       if(error) {
         console.log(error)
         return
       }
       response.end(file)
     })
     return

};

module.exports = {
  handleHome,
  handleForm,
  handlePublic,
  handlePosts
};
