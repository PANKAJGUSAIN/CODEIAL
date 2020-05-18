const Post =require('../models/post')



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