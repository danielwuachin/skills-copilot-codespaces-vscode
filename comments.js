// Create web server with Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json')));
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json')));
  const newComment = req.body;
  comments.push(newComment);
  fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments));
  res.json(comments);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});