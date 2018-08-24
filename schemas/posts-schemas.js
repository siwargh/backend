var mongoose = require("mongoose");
var post = new mongoose.Schema({
    author :{type:String , default:"5b7e9f4b2d407017f42d699f"},
    titre: {type: String, default:"cafe"  },
    contenue: {type: String,  default:"photo" },
    create_date: { type: Date, default: Date.now },
    publishing_date: { type: Date, default: Date.now },
    categorie: { type: String, default:"rest"},
    place: {
        adresse1: {  type: String, default:"zone tourrestique"},
        adresse2: { type: String,default:"mahdia" },
         
        city: { type: String,default:"mahdia" },
        zipcode: {type: Number, default:"5124" },
        geoposition: {
             langitude: {  type: String, default:"142.325" },
             latitude: {type: String,  default:"541.321" }
        }
    },
    totalrating: {  type: Number, default:"25" },
    comments: [
        { 
            datecomment: { type: Date, default: Date.now },
            content: { type: String, default:"very nice" },
            ownerid: { type: String, default:"5b7e9fe39855dc1ab8c27bd1" }
        }
    ]
});

    
module.exports = mongoose.model('Posts', post);
