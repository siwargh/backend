var mongoose = require('mongoose');
var schema = require('mongoose').Schema;
var ObjectID = require('mongodb').ObjectID;

var mongoClient = require('mongodb').MongoClient;

var invitationSchema = schema({
    senderId: {
        type: Number,
        required: true
    },
    recieverId: {
        type: Number,
        require: true
    },
    responding_date: Date,
    date_frindship: Date

});

module.exports = mongoose.model('invitations', invitationSchema);