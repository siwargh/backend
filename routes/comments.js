var express=require('express');
var router=express.Router();
var User =require('../schemas/user-schemas');
var Post =require('../schemas/posts-schemas');
var Comment=require('../schemas/comments-schema');

router.post('/v1/addcomment',function(req,res,next){
    let theUser=req.body.userId;
    let thePost=req.body.postId;
    let theContent=req.body.content;

    Post.findOne({_id: thePost}).populate("").exec((err, post) => {
        if (err) {
          return next(err);
        }
        let comment = new Comment({post: post._id, author: theUser, content: theContent});
        comment.save((err, comment) => {
          post.comments.push(comment);
          post.save(() => {
            Post.findOne({_id: thePost})
              .populate({path: "comments", model: "Comment", populate: {path: "author", model: "User"}})
              .exec((err, _post) => {
              return res.json({post: _post.preparedForClient(req.user)});
            });
          });
        });
      });
});




module.exports =router;