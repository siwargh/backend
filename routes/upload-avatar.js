var express =require('express');
var multer=require('multer');
var Q =require('q');
var router=express.Router();
var User=require('../schemas/user-schemas');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './uploads/avatars');
    },
    filename: function(req, file, cb) {
        var userId = req.body.userId;
        var path = file.fieldname + '-' + userId + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
        cb(null, path);

        updateAvatar(userId, path)
            .then(function() {
                res.sendStatus(200);
            })
            .catch(function(err) {
                res.status(400).send(err);
            });
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('avatar');

function updateAvatar(id, path) {
    var deferred = Q.defer();
    User.findByIdAndUpdate({ _id: id }, { $set: { avatar_url: path } },
        function(err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve();
        });
    return deferred.promise;
}

router.post('/upload', upload, function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: 'Avatar successfully uploded' });
    });
});

module.exports = router;


