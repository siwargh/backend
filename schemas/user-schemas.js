var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    first_name: { type: string, require: true },
    last_name: { type: String, require: true },
    adresse: {
        adresse1: { type: String, require: true },
        adresse2: { type: String, require: false },
        town: { type: String, require: false },
        city: { type: String, require: false },
        govermant: { type: String, require: false },
        zipcode: { type: Number, require: false },},
    geoposition:{
        langitude:{type:string , require: false},
        latitude:{type:string , require:false}
        
    },

    email: { type: String, require: true },
    gender :{type:string, required:true},
    password: { type: String, require: true },
    photo_url: { type: string, require: false },
    occupation: {type:string},
    friends:[ 
        iduser={type: Number , require:false}
    ]


})
module.exports = mongoose.model('users', userSchema);