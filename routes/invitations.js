var express = require('express');
var router = express.Router();
var Users = require('../schemas/user-schemas');
var Invitations = require('../schemas/invitation-schemas');
var mongoose = require('mongoose');
var Q = require('q');
 
router.get('/v1/test', (req, res) => {
    res.send("true test");
});


router.get('/v1/all', function (req, res ) {
    Invitations.find(function (err, invitations) {
        if (err) return  (err);
        res.send(JSON.stringify(invitations));
        console.log(invitations.length);
    });
});

router.get('/v1/seul', function(req, res, next) {
    Invitations.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post); });
    });
    
 
    router.post('/v1/add', function(req, res) {
        
      Invitations.create(req.body , function (err, invitation) {
        if (err) return  (err);
         
        
       res.send(invitation);
        console.log("okkkkkk ave csuccseesessss");
    
     });
     
});


router.delete('/v1/delete', function(req, res, next) {
    Invitations.findOneAndDelete(req.params.id, req.body, function (err, invitation) {
    if (err) return next(err);
    res.json(invitation);
    });
});


// Get all pending send invitation out
router.get('/v1/invitations/pending/out/', function(req, res) {
    var senderId = req.params.id;
    Invitations.find({ senderId: senderId },function  (err, invitation) {
        if (err) {
            res.send(err);
        }
        res.send(invitation);
    });
});


// Get all pending recieved invitation in (test ok)
router.get('/v1/invitations/pending/in/', function (req, res) {
    var receiverId = req.params.id;
    var invitSenderIds = [];
    Invitations.find({ recieverId: receiverId }, function (err, invitations) {
        if (err) {
            res.send(err);
        }
        res.send(invitations);
    });
});

var updateFriendsArray = function (req, res, next) {
    var defer = Q.defer();

    var senderId = req.body.invitation.senderId;
    var recieverId = req.body.invitation.recieverId;
    var friendShipAt = Date.now();
    var invitationId=req.body.invitation._id;
   

    var promise = function () {
        defer = Q.defer();

        Users.findOne({ _id: senderId }, (err, user) => {
            var tmpfriends = user.friends;
            var friend = { friendId: '' };
            friend.friendId = recieverId;
            friend.friendShipAt = friendShipAt;
            

            tmpfriends.push(friend);

            Users.findOneAndUpdate({ _id: senderId }, { friends: tmpfriends }, function(err, user) {
                if (err) {
                    res.send(err);
                    defer.reject(err);
                }
            })

        })

        //update receiver friends array
        Users.findOne({ _id: recieverId }, (err, user) => {
            var tmpfriends = user.friends;
            var friend = { friendId: ''};
            friend.friendId = senderId;
            friend.friendShipAt = friendShipAt;
            
            tmpfriends.push(friend);
            Users.findOneAndUpdate({ _id: recieverId }, { friends: tmpfriends },
                function (err, user) {
                    if (err) {
                        res.send(err);
                        defer.reject(err);
                    }
                   

                    
                });
        }); // userModel.findOne;


        //delete accepted initations 

        Invitations.findOneAndRemove({_id:invitationId}, function (err, result) {
            if (err) {
                res.send(err);
                defer.reject(err);
            }
            
        });


        defer.resolve();
    } // end promise
    promise();
    next();
} // end midle ware updateFriendArray


router.put('/v1/invitations/accept', updateFriendsArray,function  (req, res)  {

   
    //console.log("request:body   ", req.body);
});

module.exports = router;