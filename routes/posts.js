var express = require('express');
var router = express.Router();
 
var posts = require('../schemas/posts-schemas');
var mongoose = require('mongoose');


router.get('/test', (req, res) => {
    res.send("true test");
});
router.get('/all', function (req, res) {
    posts.find(function (err, posts) {
        if (err) return next(err);
        res.send(JSON.stringify(posts));
        console.log(posts.length);
    });
});
router.get('/:id', function (req, res, next) {
    posts.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


router.post('/add', (req, res) => {
    var post = {
        titre: { type: string, require: true },
        description: req.body.description,
        create_date=Date.now(),
        categorie: req.body.categorie,

        place: {
            adresse1: req.body.adresse1,
            adresse2: req.body.adresse2,
            town: req.body.town,
            city: req.body.city,
            govermant: rq.body.govermant,
            zipcode: req.body.zipcode
        },

        cotenu: {
            type: req.body.cotenu,
            description_georaphique: {
                langitude: req.body.langitude,
                latidude: req.body.latidude
            }
        }

    };


    posts.collection.insertOne(post, function (err, result) {
        if (err) {
            res.send(err);
        }
        console.log("post created  Successfully");
        res.send(post);
    })
})

router.post('/comment', (req, res) => {
    var comment = {
        contenus: req.body.contenus,
        ownerid: req.param.ownerid,
        post_id: req.param.post_id
    };


    posts.collection.insertOne(comment, function (err, result) {
        if (err) {
            res.send(err);
        }
        console.log("Comment create Successfully");
        res.send(comment);
    })
});

router.delete('/delete/:id', function (req, res) {
    console.log('post deleted deleted ');
    posts.findByIdAndRemove(req.params.id, (err, docs) => {
        if (err) return console.log(err);
        res.send('post removed Successufully :' + req.params.id)
    })
});


module.exports = router;