var express = require('express');
var router = express.Router();
var users = require('../schemas/users-schemas.js');

router.post('/add', (req, res) => {
    var user = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        email: req.body.email,
        password: req.body.password

    };
    users.collection.insertOne(item, function (err, result) {
        console.log("User inserted Successfully");
        res.send(item);
        res.send("yessss");
    })
})

router.get('/all', function (req, res, next) {
    users.find(function (err, users) {
        if (err) return next(err);
        res.send(JSON.stringify(users));
        console.log(users.length);
    });
});

router.post('/users/authenticate', (req, res) => {
    // var deferred = Q.defer();
    var email = req.body.email;
    var password = req.body.password;
    console.log(user_name, '  ', password);
    userModel.findOne({
        email: email
    }, function (err, user) {


        if (user && (password === user.password)) {
            // authentication successful

            res.send({ err: "Login Succeed", message: user });
        } else {
            // authentication failed

            res.send({ err: "Login Failed", message: 'Autenticated Failed Try again' })
        }
    });


})

router.put('/users/:userId', (req, res) => {
    var userId = req.params.userId;
    var user = req.body;
    console.log(user);
    userModel.findOneAndUpdate({
        _id: req.params.userId
    }, req.body, function (err, user) {
        res.send('user successfully updated');
    });
})



router.get('/', (req, res) => {
    res.send("Hello users");
})

router.get('/test', (req, res) => {
    res.send("Successfully test");
})

module.exports = router;