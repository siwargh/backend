var express = require('express');
var router = express.Router();
var Users = require('../schemas/user-schemas');
var Invitations = require('../schemas/invitation-schemas');
var mongoose = require('mongoose');
var Q = require('q');





router.get('/v1/all', function (req, res) {
    Invitations.find(function (err, invitations) {
        if (err) return (err);
        res.send(invitations);
        console.log(invitations.length);
    });
});


// get all pending invitation to one user
// id of user
router.get('/v1/:id', function (req, res, next) {
    var id = req.params.id;

    Invitations.findById({
        reciverId: id
    }, function (err, invitations) {
        if (err) return next(err);
        res.send(invitations);
    });
});


router.post('/v1/add', function (req, res) {
    let recieverId = req.body.recieverId;
    let senderId = req.body.senderId;
    
    let invitation = {
        senderId: senderId,
        recieverId: recieverId
    };

    Invitations.create(invitation, function (err, invitation) {
        if (err) {
            res.send({
                err: "fail",
                message: "Cant add invitation"
            });
        }        res.send({
            err: "succeed",
            message: invitation
        });
    });

});


router.delete('/v1/delete/:id', function (req, res, next) {
    Invitations.findOneAndDelete(req.params.id,function (err, invitation) {
        if (err) return next(err);
        res.json(invitation);
    });
});


// Get all pending send invitation out
router.get('/v1/invitations/pending/out/', function (req, res) {
    var senderId = req.params.id;
    Invitations.find({
        senderId: senderId
    }, function (err, invitation) {
        if (err) {
            res.send(err);
        }
        res.send(invitation);
    });
});


// Get all pending recieved invitation in (test ok)
router.get('/v1/pending/in/:id', function (req, res) {
    var receiverId = req.params.id;
    
    Invitations.find({
        recieverId: receiverId
    }, function (err, invitations) {
        if (err) {
            res.send({err:"fail",message:"cant get pending recived invitations"});
        }
        res.send({err:"succes" , message:invitations});
    });
});

var updateFriendsArray = function (req, res, next) {
    var defer = Q.defer();
    var senderId = mongoose.Types.ObjectId(req.body.senderId);
    var recieverId = mongoose.Types.ObjectId(req.body.recieverId);
    var friendShipAt = Date.now();
    var invitationId = req.body._id;
 
    var promise = function () {
        defer = Q.defer();

        Users.findOne({
            _id: senderId
        }, (err, user) => {
            var tmpfriends = user.friends;
            var friend = {
                friendId: null
            };
            friend.friendId = recieverId;
            friend.friendShipAt = friendShipAt;


            tmpfriends.push(friend);

            Users.findOneAndUpdate({
                _id: senderId
            }, {
                friends: tmpfriends
            }, function (err, user) {
                if (err) {
                    res.send(err);
                    defer.reject(err);
                }
            })

        })

        //update receiver friends array
        Users.findOne({
            _id: recieverId
        }, (err, user) => {
            var tmpfriends = user.friends;
            var friend = {
                friendId: null
            };
            friend.friendId = senderId;
            friend.friendShipAt = friendShipAt;

            tmpfriends.push(friend);
            Users.findOneAndUpdate({
                    _id: recieverId
                }, {
                    friends: tmpfriends
                },
                function (err, user) {
                    if (err) {
                        res.send(err);
                        defer.reject(err);
                    }

                });
        }); // userModel.findOne;


        //delete accepted initations 

        Invitations.findOneAndRemove({
            _id: invitationId
        }, function (err, result) {
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


router.put('/v1/invitations/accept', updateFriendsArray, function (req, res) {
    
    res.send({err:"success",message:"Invitation successfully accepted"});
});



//Renvois le nombre des invitations en cours d'acceptation 
//Id pram est l'identifiant de curentUser
router.get('/v1/invitations/pending/in/count/:id',function(req,res){
    var defer=Q.defer();
    var id=req.params.id;
    Invitations.find({recieverId:id},function(err,invitations){
        if (err) {
            res.send({err:"fail" , message:"Erreur"});
            defer.reject(err);
        }
        res.send({err:"success" , message:invitations.length});
        defer.resolve();

    })
});

router.get('/v1/invitations/pending/in/:id',function(req,res){
    var defer=Q.defer();
    var id=req.params.id;
    Invitations.find({recieverId:id},function(err,invitations){
        if (err) {
            res.send({err:"fail" , message:"Erreur"});
            defer.reject(err);
        }
        res.send({err:"success" , message:invitations});
        defer.resolve();

    })
});

module.exports = router;