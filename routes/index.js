var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var url = 'mongodb://vasya:1234@ds161109.mlab.com:61109/nodeblog01'
var db = monk(url);

/* Homepage Blog Post */
router.get('/', function(req, res, next) {
  var db =  req.db;
  var posts = db.get('posts');
  console.log(posts);
  posts.find( {}, {}, function(err, posts) {
      res.render('index', {
          "posts": posts
      });
  });
});

module.exports = router;
