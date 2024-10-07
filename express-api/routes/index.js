var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const currentTime = new Date();
  res.send(`This is my API MIA running... Current time: ${currentTime}`);
});

router.get('/heatcheck', function(req, res, next) {
  const currentTime = new Date();
  res.send(`This is my about route. Current time: ${currentTime}`);
});

module.exports = router;
