var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.send('index.html')
  //res.sendFile('index.html', {root: __dirname})
  
  res.render('index', { title: 'Express' });
});

module.exports = router;
