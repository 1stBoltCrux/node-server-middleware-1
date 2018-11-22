// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for lions
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server

var tigerRouter = require('express').Router();
var _  = require('lodash')


var tigers = [];
var id = 0;

var logTiger = function(req, res, next) {
  console.log('tiger');
  next();
}

var updateId = function(req, res, next) {
  if(!req.body.id) {
    id++
    req.body.id = id + '';
  }
  next();
}

tigerRouter.use('/', logTiger)

tigerRouter.param('id', function(req, res, next, id) {
  var tiger = _.find(tiger, {id: id});

  if (tiger) {
    req.tiger = tiger;
    next();
  } else {
    res.send();
  }
})

tigerRouter.get('/', function(req, res) {
  res.json(tigers)
})

tigerRouter.get('/:id', function(req, res) {
  var tiger = req.tiger;
  res.json(tiger || {})
})

tigerRouter.post('/', updateId, function (req, res) {
  var tiger = req.body;
  tigers.push(tiger);
  res.json(tiger);
})

tigerRouter.put('/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id;
  }

  var tiger = _.findIndex(lions, {id: req.params.id});
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedTiger = Object.assign(lions[lion], update);
    res.json(updatedLion);
  }
})

module.exports = tigerRouter;
