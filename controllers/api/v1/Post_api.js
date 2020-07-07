const Post =require('../../../models/post');
const Comment=require('../../../models/comment');

//show the post (output in json format)
module.exports.index =async function(req,res){

    //took from index.js(controller)where we used to populate
    let posts=await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path :'comments',
                populate:{
                    path :'user'
                }
            });
    //uptil here


    return res.json(200,{
        message:'list of posts',
        posts:posts
    })
}

//destroys the post (output in json format)
module.exports.destroy = async function(req,res){
        try{
            let post= await Post.findById(req.params.id);

            //if(post.user == req.user.id){
                post.remove();

                await  Comment.deleteMany({post: req.params.id});

                return res.json(200,{
                    message :"post and associated comments deleted successfully!"
                });
            // }
        }catch(err){
            console.log('******',err);
            return res.json(500,{
                message :"internal server errror"
            })
    }
}
