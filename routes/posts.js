var express = require('express');
var router = express.Router();
var users = require('../schemas/user-schemas');
var Posts = require('../schemas/posts-schemas');
var mongoose = require('mongoose');
var Q = require('q');
 
router.get('/v1/test', (req, res) => {
    res.send("true test");
});


router.get('/v1/all', function (req, res ) {
    Posts.find(function (err, posts) {
        if (err) return  (err);
        res.send(JSON.stringify(posts));
        console.log(posts.length);
    });
});

router.get('/v1/seul', function(req, res, next) {
    Posts.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post); });
    });
    
 
    router.post('/v1/add', function(req, res) {
        
        Posts.create(req.body , function (err, post) {
        if (err) return  (err);
         
        
       res.send(post);
        console.log("okkkkkk ave csuccseesessss");
    
     });
     
});


router.delete('/v1/delete', function(req, res, next) {
    Posts.findOneAndDelete(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
    });
});


module.exports = router;
