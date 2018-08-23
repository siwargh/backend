var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    first_name: { type: String, //default:"moussa" 
},
    last_name: { type: String, //default:"youssef"
 },
    adresse: {
        adresse1: { type: String, //default:"mahdia" 
    },
        adresse2: { type: String,// default:"ksour essef"
     },

        city: { type: String, 
        //    default:"rcharcha"
         },
        govermant: { type: String,// default:"mahdia"
     },
        zipcode: { type: Number,// default:"5146"
     },},
    geoposition:{
        langitude:{type:String ,//default:"144.256"
    },
        latitude:{type:String , //default:"254.1236"
    }
        
    },

    email: { type: String, //default:"salahyoussef@gmail.com" 
},
    gender :{type:String, //default:"homme"
},
    password: { type: String,
        // default:"2309" 
        },
    photo_url: { type: String,//default:"file:///C:/Users/hed/Downloads/Examen%20TP%20v2.pdf" 
},
    occupation: {type:String , //default:"medecin"
},
    friends:[ 
        userId={type: String ,//default:""
    }
    ]


})
module.exports = mongoose.model('users', userSchema);