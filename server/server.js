var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var lions = [];
var id = 0;

var updateId = function(req, res, next){
  if (!req.body.id) {
    id ++
    id = id + ''
    req.body = Object.assign({id: id}, req.body)
  }
  next();
}

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.param('id', function(req, res, next, id) {
  console.log(id);
  var lion =_.find(lions, {id: id});
  console.log(lion);
if (lion) {
  req.lion = lion
  next();
} else {
  res.send();
}

});

app.get('/lions', function(req, res) {
  res.json(lions);
})

app.get('/lions/:id', function(req, res) {
  var lion = req.lion
  res.json(lion || {})
});

app.post('/lions', updateId, function(req, res) {
  var lion = req.body;

  lions.push(lion);
  res.json(lion);

})

app.use(function(err, req, res, next) {
  if (err) {
    res.status(500).send(err)
  }
});

app.listen(4000);
