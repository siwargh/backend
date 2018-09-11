var mongoose = require('mongoose');
var User = require('../schemas/user-schemas');
var Post = require('../schemas/posts-schemas');
var lodash = require('lodash');
 
var commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post:{ 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    comment_date: {
        type: Date, 
        default: Date.now
    },
    content:{
        type:String,
        required:true
    }

});

commentSchema.methods.preparedForClient = function preparedForClient() {
    const comment = this;
  
    let preparedComment = lodash.pick(comment, [
      "_id", 
      "content",
      "author",
      "comment_date",
      "post",
    ]);
  
    preparedComment.author = preparedComment.author.preparedForClient();
  
    return preparedComment;
  }


  const Comment = mongoose.model('Comment', commentSchema);

  module.exports = Comment;