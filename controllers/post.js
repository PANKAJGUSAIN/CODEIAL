const Post =require('../models/post')

const Comment =require('../models/comment');

const postsMailer =require('../mailers/posts_mailer');

const postsEmailWorker =require('../workers/post_email_worker');

const queue =require('../config/kue');

const Like =require('../models/like');



//to add post or comment in the database
module.exports.post_content =async function(req,res){
    // normal method    
    //Post.create({
        //    content : req.body.content,
        //    user :req.user._id
        //},function(err){
        //    if(err){
        //        console.log('error in creating user while posting');
        //        return
        //    }
        //        return res.redirect('back');
        //}
        //)

        //using async wait method
        try{

            let post = await Post.create({
                   content : req.body.content,
                    user :req.user._id
                })

                post = await post.populate('user','name email').execPopulate();
                //postssMailer.newPost(post);
                //creating a job(task)
                let postjob = queue.create('post_emails',post).save(function(err){
                    if(err){
                        console.log('error in sending to the queue',err);
                    }
                    console.log('job enqueued',postjob.id);
                })
                


            if(req.xhr){
                //post = await post.populate('user','name').execPopulate();
                return res.status(200).json({
                    data:{
                        post :post
                    },
                    message :'post created!'
                });
            }
            req.flash('success','POST PUBLISHED!');
            return res.redirect('back');
        }catch(err){
            req.flash('error',err);
            //console.log('Error',err);
            return redirect('back');

        }
}

// to delete a post and comments associated with it
module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();
            // now we also delete all the comments associated with it so we require the 'Comment' model
            Comment.deleteMany({post: req.params.id},function(err){
                // CHANGE :: delete the associated likes for the post and all its comments' likes too
            Like.deleteMany({likeable: post, onModel: 'Post'});
            Like.deleteMany({_id: {$in: post.comments}});

                if(req.xhr){
                    return res.status(200).json({
                        data :{
                            post_id :req.params.id
                        },
                        message :"POST DELETED SUCCESSFULLY"
                    });
                }
                
                req.flash('success','POST AND ASSOCIATED COMMENTS DELETED');
                return res.redirect('back');
            })
        }
        else{
            //console.log('user is not same')
            req.flash('error','YOU CANNOT DELETE POST');
            return res.redirect('back');
        }
    })
}

 // to delete a post and comments associated with it  but this time using async wait method
    //module.exports.destroy = async function(req,res){
    //    try{
    //        let post= await Post.findById(req.params.id);

    //        if(post.user == req.user.id){
    //            post.remove();

    //            await  Comment.deleteMany({post: req.params.id});
    //            return res.redirect('back');
    //            }
    //    }catch(err){
    //        console.log("error",err);
    //        return
    //}
//}
