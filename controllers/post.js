const Post =require('../models/post')

const Comment =require('../models/comment');


//to add post or comment in the database
module.exports.post_content =function(req,res){
    console.log(req.body)
        Post.create({
            content : req.body.content,
            user :req.user._id
        },function(err){
            if(err){
                console.log('error in creating user while posting');
                return
            }
                return res.redirect('back');
        }
    )
}

// to delete a post and comments associated with it
module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();
            // now we also delete all the comments associated with it so we require the 'Comment' model
            Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
            })
        }
        else{
            //console.log('user is not same')
            return res.redirect('back');
        }
    })
}