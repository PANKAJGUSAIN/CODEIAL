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
                    req.flash('error',err);
                    //console.log('error',err);
                }
                else{

                    if (req.xhr){
                        // Similar for comments to fetch the user's id!
                        comment.populate('user', 'name').execPopulate();
                        return res.status(200).json({
                            data: {
                                comment: comment
                            },
                            message: "Post created!"
                        });
                    }
        
                    post.comments.push(comment);
                    post.save();
                    req.flash('success','COMMENT ADDED');
                    return res.redirect('back');
                }
            })
        }
        else{
            res.redirect('back');
        }
    })
}

// to delete a comment
module.exports.destroy=function(req,res){
    Comment.findById(req.params.id).populate('post').exec(function(err,comment) {
        //console.log(comment.post);
        if(comment.user == req.user.id || comment.post.user ==req.user.id ){
            
            // now before deleting the comment we need to fetch the id of the post and then delete the comment from there
            let postId =comment.post._id;
            comment.remove();

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post) {

                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }
    
                req.flash('success','COMMENT DELETED');

                return res.redirect('back');
            })
        }else{
            //console.log('not matched')
            req.flash('error','YOU ARE NOT AUTHORIZED');
            return res.redirect('back');
        }
    })
}