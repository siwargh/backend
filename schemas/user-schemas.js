var mongoose = require('mongoose');
var lodash=require('lodash');


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
    
    ]
});


userSchema.methods.preparedForClient = function preparedForClient() {
    const user = this;
  
    const preparedUser = lodash.pick(user, [
      "_id",
      "first_name",
      "last_name",
      "city",
      "gender",
      "email",
      "avatar_url",
      "occupation"
    ]);
    return preparedUser;
  };

  const User = mongoose.model('User', userSchema);

  module.exports = User;
  
