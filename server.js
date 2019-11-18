var express = require('express');
var app = express();
// var _dirname = '.';

app.use(express.static(__dirname + '/www'));
app.listen('3000');
console.log('webserver started on port 3000');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

