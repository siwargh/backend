var mongoose = require('mongoose');
 
 

 

invitationSchema =  new mongoose.Schema({
   senderId:{ type: String, default:"5b7e9cf23a79b21428764185" },
   receverId:{ type: String, default:"5b7e9d2b3a79b21428764186" },
    responding_date:{ type: Date, default: Date.now },  
    date_frindship: { type: Date, default: Date.now },

});


module.exports = mongoose.model('Invitations', invitationSchema);
