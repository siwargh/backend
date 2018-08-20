var mongoose = require("mongoose");
var post = new mongoose.Schema({
    author :{id:String},
    titre: {type: string, require: true },
    contenue: {type: string, require: true },
    create_date: { typr: Date,require: true },
    publishing_date: { type: Date, require: true },
    categorie: { type: string,require: true},
    place: {
        adresse1: {  type: String, require: true},
        adresse2: { type: String,require: false },
        town: {type: String, require: false },
        city: { type: String,require: false },
        zipcode: {type: Number, require: false },
        geoposition: {
             langitude: {  type: string,require: false },
             latitude: {type: string,  require: false }
        }
    },
    totalrating: {  type: Number, require: false },
    comments: [
        { 
            datecomment: { type: Date, require: true },
            content: { type: String,require: true },
            ownerid: { type: String, require: true }
        }
    ]
});

    
module.exports = mongoose.model('posts', post);
