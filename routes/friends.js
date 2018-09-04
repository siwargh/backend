var express = require('express');
var router = express.Router();
var Users = require('../schemas/user-schemas');

var mongoose = require('mongoose');
var Q = require('q');

router.get('/v1/get/all/:id', function (req, res, next) {
   
    var userId = req.params.id;
    var myFriends = [];
    return new Promise(function(resolve,reject){
        Users.findOne({_id:userId}, function (err, doc) {
            if (err) return reject(err);
            doc.friends.map(fri => {
                Users.findOne({_id:fri.friendId},function(error,friend){
                    if (err) return reject(err);
                    myFriends.push(friend);  
                });
            });
            
        });
        resolve(myFriends);
        res.send(myFriends);
    });
    
});
  



module.exports = router;