var express = require('express');
var router = express.Router();
var Users = require('../schemas/user-schemas');

var mongoose = require('mongoose');
var Q = require('q');




router.get('/v1/all', function (req, res) {
    Users.find(function (err, Users) {
        if (err) return (err);
        res.send(JSON.stringify(Users));
        console.log(Users.length);
    });
});

router.get('/v1/:id', function (req, res, next) {
    Users.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});


router.post('/v1/add', function (req, res) {
    console.log(req.body);
    var theUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        city: req.body.city,
        occupation: req.body.occupation,
        password:req.body.password
    };
    Users.collection.insertOne(theUser, function (err, result) {
        if(err){
            res.send(err);
        }
        console.log("User inserted Successfully");
        res.send(theUser);
    });

});


router.delete('/v1/delete', function (req, res, next) {
    Users.findOneAndDelete(req.params.id, req.body, function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});
router.post('/v1/authenticate', (req, res) => {

    var deferred = Q.defer();

   
    let email =req.body.email;
    let password = req.body.password;
    Users.findOne({
        email: email
    }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        console.log(user);
        if (user && (password === user.password)) {
            // authentication successful

            res.send({
                err: "success",
                message: user
            });
        } else {
            // authentication failed

            res.send({
                err: "Login Failed",
                message: 'Autenticated Failed Try again'
            });
        }
    });
    

     return deferred.promise;
     
});



router.get('/v1/users/foreigners', function (req, res) {
    var userId = req.params.id;
    Users.find({
        _id: {
            $ne: userId
        }
    }, function (err, users) {
        if (err) {
            res.send(err);
        }
        res.send(users);
    });
});

router.get('/v1/users/recived', function (req, res) {
    var userId = req.params.id;
    Users.find({
        _id: userId
    }, function (err, users) {
        if (err) {
            res.send(err);
        }
        res.send(users);
    });


});

router.get('/v1/users/friends', function (req, res) {
    var userId = req.params.id;
    Users.find({
        _id: userId
    }, function (err, result) {
        if (err) {
            res.send(err);
        }

        res.send(result[0].friends);
        //console.log('friends',result[0].freinds);
    })
})
router.put('/v1/update', function (req, res) {
    var userId = req.params.userId;
    var user = req.body;
    console.log(user);
    Users.findOneAndUpdate({
        _id: req.params.userId
    }, req.body, function (err, user) {
        res.send('user successfully updated');
    });
});

module.exports = router;