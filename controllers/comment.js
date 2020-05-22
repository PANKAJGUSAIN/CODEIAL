const Comment =require('../models/comment')
const Post =require('../models/post')


//to add post or comment in the database
module.exports.create =function(req,res){
    console.log(req.body)
    console.log(req.user._id)
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content :req.body.content,
                post :req.body.post,
                user :req.user._id
            },function(err,comment){
                if(err){
                    console.log('error',err);
                }
                else{
                    post.comments.push(comment);
                    post.save();
                    return res.redirect('back');
                }
            })
        }
        else{
            res.redirect('back');
        }
    })
}