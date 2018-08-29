var mongoose = require('mongoose');
 
 

 

invitationSchema =  new mongoose.Schema({
   senderId:{ type: String },
   receverId:{ type: String },
   date_frindship: { type: Date, default: Date.now }

});


module.exports = mongoose.model('Invitations', invitationSchema);
