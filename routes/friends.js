var express = require('express');
var router = express.Router();
var Users = require('../schemas/user-schemas');

var mongoose = require('mongoose');
var Q = require('q');

router.get('/v1/get/all/:id', (req, res, next) => {
    var userId = req.params.id;
    var myFriends = [];

    async function action() {
        const currentUser=await Users.findById(userId, (err, user) => {
            user.friends.map( async (u) => {
                await Users.findById(u.friendId, async (err, friend) => {
                    await myFriends.push(friend);
                });
                res.send({err:"success",message:myFriends});
            });
           
        });
       
    } 
    action().catch(next);

    
});





module.exports = router;