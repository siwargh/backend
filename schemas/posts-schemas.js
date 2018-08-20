var mongoose = require("mongoose");
var post = new mongoose.Schema({
    titre: { type: string, require: true },
    description: { type: string, require: true },
    create_date: { typr: Date, require: true },
    publishing_date: { type: Date, require: true },
    categorie: { type: string, require: true },
    place: {
        adresse1: { type: String, require: true },
        adresse2: { type: String, require: false },
        town: { type: String, require: false },
        city: { type: String, require: false },
        govermant: { type: String, require: false },
        zipcode: { type: Number, require: false },
    },
    totalrating: { type: Number, require: false },
    comment: {
        datecomment: { type: Date, require: true },
        content: { type: String, require: true },
        ownerid: { type: String, require: true },
        comment_rite: { type: Number, require: false },
    },
    cotenu: {
        type: { type: string, require: true },
        description_georaphique: {
            langitude: {type: string, require: false },
            latitude: {type: string , require: false}
        
    }
}




})
