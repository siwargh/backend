var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var User = require('./user-schemas');
var Comment = require('./comments-schema');
var lodash = require('lodash');

var postSchema = new mongoose.Schema({
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
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
});

postSchema.methods.preparedForClient = function preparedForClient(currentUser) {
    const post = this;
  
    let preparedPost = lodash.pick(post, [
      "_id", 
      "author",
      "content",
      "create_date",
      "publishing_date",
      "categorie",
      "comments"  
    ]);
  
    //preparedPost.author = preparedPost.author.preparedForClient();
  
   
    // comments section
    lodash.forEach(preparedPost.comments, (_comment, index) => {
      preparedPost.comments[index] = _comment.preparedForClient();
    });
  
    return preparedPost;
  }
  


  const Post = mongoose.model('Post', postSchema);

  module.exports = Post;
  