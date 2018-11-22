var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var lions = [];
var id = 0;

var updateId = function(req, res, next){
  id ++
  Object.assign({id: id}, req.body)
  next();
}

app.get('/lions', function(req, res) {
  res.json(lions);
})

app.get('/lions/:id', function(req, res) {
  res.json(lion || {})
});

app.post('/lions', updateId, function(req, res) {
  var lion = req.body;

  lions.push(lion);
  res.json(lion);
})

app.listen(4000);
