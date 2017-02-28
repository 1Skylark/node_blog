var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var url = 'mongodb://vasya:1234@ds161109.mlab.com:61109/nodeblog01'
var db = monk(url);

router.get('/show/:category', function(req, res, next) {
    var db = req.db;
    var posts = db.get('posts');
    posts.find({category: req.params.category}, {}, function(err, posts){
        res.render('index', {
            "title": req.params.category,
            "posts": posts
        });
    });
});
router.get('/add', function(req, res, next) {
    res.render('addcategory', {
        "title": "Add Category"
    });
});

router.post('/add', function(req, res, next){
    // Ger form values
    var title    = req.body.title;
    // Form Validation
    req.checkBody('title', 'Title field is required').notEmpty();
    // Check Errors
    var errors = req.validationErrors();

    if(errors){
        res.render('addcategory', {
            "erors": errors,
            "title": title
        });
    } else {
        var categories = db.get('categories');

        // Submit to db
        categories.insert({
            "title": title
        }, function(err, category){
            if(err){
                res.send('There was an issue submitting the category');
            } else {
                req.flash('success', 'Category Submitted');
                res.location('/');
                res.redirect('/');
            }
        });
    }
});

module.exports = router;
