var mongoose = require("mongoose");
var User = require('./user-schemas');

var post = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    publishing_date: {
        type: Date,
        default: Date.now
    },
    categorie: {
        type: String
    },
    place: {
        adress1: {
            type: String
        },
        adress2: {
            type: String
        },

        city: {
            type: String
        },
        zipcode: {
            type: Number
        },
        geoposition: {
            longitude: {
                type: String
            },
            latitude: {
                type: String
            }
        }
    },
    totalrating: {
        type: Number
    },
    comments: [{
        datecomment: {
            type: Date,
            default: Date.now
        },
        content: {
            type: String
        },
        ownerid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }]
});
 

module.exports = mongoose.model('Post', post);