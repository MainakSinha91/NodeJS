const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const users = require('./users.json');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
      console.log(user);

      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
app.post('/api/authenticate', (req, res) => {
  const user = users.find(u => { return u.username === req.body.username && u.password === req.body.password });
  if (user) {
    const accessToken = jwt.sign({ username: req.username, password: req.password },
      process.env.ACCESS_SECRET, {
      expiresIn: 86400
    });

    res.status(201).json({
      message: 'Logged in',
      token: accessToken
    });
  }
  else {
    res.status(401).json({
      message: 'Username or password incorrect'
    });
  }
})
app.post("/api/posts", authenticateJWT, (req, res) => {
  try {
    fs.readFile("./fileStorage/savePost.json", (err, data) => {
      let prevData = [];
      if (data) {
        prevData = JSON.parse(data);
      }
      prevData.push(req.body);
      res.status(201).json({
        message: 'Post added successfully'
      });
      fs.writeFile('./fileStorage/savePost.json', JSON.stringify(prevData), (status) => {
        console.log(status);
      })
    });
  }
  catch (err) {
    console.log('err', err);
  }
});
app.get("/api/fetchposts", authenticateJWT, (req, res, next) => {
  fs.readFile("./fileStorage/savePost.json", (err, data) => {
    let prevData = [];
    if (data) {
      prevData = JSON.parse(data);
    }
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: prevData
    });
  });
});
module.exports = app;
