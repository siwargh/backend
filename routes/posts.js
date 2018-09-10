var express = require('express');
var router = express.Router();
var User = require('../schemas/user-schemas');
var Posts = require('../schemas/posts-schemas');
var mongoose = require('mongoose');
var Q = require('q');
var _ = require('lodash');


router.get('/v1/mur/:id',(req, res,next)=> {
    Posts.find({}).populate('author').
    exec(function (err, posts) {
        if(err) return res.send({err:'Fail',message:err});
        res.send(posts);
    });
   
});

router.get('/v1/seul/:id', function (req, res, next) {
    Posts.findById(req.params.id)
    .populate('author').
    exec(function (err, posts) {
        if(err) return res.send({err:'Fail',message:err});
        res.send(posts);
    })
});


router.post('/v1/add', function (req, res) {
    var defer = Q.defer();
    var myPost={
        author:req.body.author,
        content:req.body.content,
        categorie:req.body.categorie,
        place:{
            adress1:req.body.place.adress1,
            adress2:req.body.place.adress2,
            city:req.body.place.city,
            zipcode:req.body.place.zipcode,
            geoposition:{
                longitude:req.body.place.geoposition.longitude,
                latitude:req.body.place.geoposition.latitude

            }

        }
    };

    Posts.create(myPost, function (err, post) {
        if (err) return (err);
        res.send({err:"Post added succeffully",message:post});
    });
    defer.resolve();

});


router.delete('/v1/delete', function (req, res, next) {
    Posts.findOneAndDelete(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;

