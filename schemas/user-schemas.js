var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    first_name: { type: String},
    last_name: { type: String},
    city: { type: String},
    adresse: {
        adresse1: { type: String  },
        adresse2: { type: String },
        city: { type: String},
        govermant: { type: String },
        zipcode: { type: Number }
    },
    geoposition:{
        langitude:{type:String },
        latitude:{type:String }
    },

    email: { type: String, required:true},
    gender :{type:String},
    password: { type: String  },
    avatar_url: { type: String},
    date_naiss:{type:Date},
    occupation: {type:String 
    },
    friends:[ 
        userId={type: mongoose.Schema.Types.ObjectId}
    ]


})
module.exports = mongoose.model('users', userSchema);