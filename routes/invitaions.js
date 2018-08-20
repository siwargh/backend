var express = require('express');
var router = express.Router();
var users = require('../schemas/users-schemas');
var invitations = require('../schemas/invitation-schemas');
var mongoose = require('mongoose');


router.get('/test', (req, res) => {
    res.send("true test");
});

router.get('/all', function (req, res, next) {
    invitations.find(function (err, invitations) {
        if (err) return next(err);
        res.send(JSON.stringify(invitations));
        console.log(invitations.length);
    });
});

router.get('/:id', function (req, res, next) {
    invitations.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
router.post('/add', (req, res) => {
    var invitation = {
        senderId: req.body.senderId,
        recieverId: req.body.recieverId,
        responding_date= Date.now(),
        status: req.body.status
    };


    invitations.collection.insertOne(invitation, function (err, result) {
        if (err) {
            res.send(err);
        }
        console.log("Invitation sent Successfully");
        res.send(invitation);
    })
});



router.delete('/delete', function (req, res) {
    //console.log('invitation deleted ');
    invitations.findByIdAndRemove(req.params.id, (err, docs) => {
        if (err) return console.log(err);
        res.send('invitation removed Successufully :' + req.params)
    })
});

router.put('/invitation/accept/:senderId', (req, res) => {
    var senderId = req.params.senderId;
    var recieverId = req.body.recieverId;
    userModel.find({ _id: senderId }, (err, user) => {
        var tmpfriends = user[0].friends;
        var friend = {};
        friend.friendId = recieverId;
        friend.date_frindship = Date.now();
        tmpfriends.push(friend);
        users.findOneAndUpdate({ _id: senderId }, { friends: tmpfriends }, (err, user) => {
            if (err) {
                res.send(err)
            }
            console.log(user);

        })
    })

    //update receiver friends array
    userModel.find({ _id: recieverId }, (err, user) => {
        var tmpfriends = user[0].friends;
        var friend = {};
        friend.friendId = senderId;
        friend.friendShipAt = Date.now();
        tmpfriends.push(friend);
        users.findOneAndUpdate({ id: recieverId }, { friends: tmpfriends },
            (err, user) => {
                if (err) {
                    res.send(err)
                }
                console.log(user);
                res.send(user);
            })
    })


});


module.exports = router;