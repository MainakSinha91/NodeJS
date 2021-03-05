const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const debug = require("debug")("node-angular");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
  try {
    fs.readFile("./fileStorage/savePost.json", (err, data) => {
      let prevData =[];
      if(data) {
        prevData = JSON.parse(data);
      }
      prevData.push(req.body);
      fs.writeFile('./fileStorage/savePost.json', JSON.stringify(prevData),(status)=>{
        console.log(status);
      })
    });
    
  }
  catch(err){
    console.log('err',err);
  }
});

app.get("/api/posts", (req, res, next) => {

  fs.readFile("./fileStorage/savePost.json", (err, data) => {
    let prevData =[];
    if(data) {
      prevData = JSON.parse(data);
    }
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: prevData
    });
  });
});
module.exports = app;
