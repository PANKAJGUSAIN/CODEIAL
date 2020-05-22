const Post =require('../models/post')

// partials works
module.exports.home=function(req,res){
    //console.log('reached');
    //Post.find({},function(err,posts){
    //   return res.render('home',{
    //        posts :posts
    //    })
    //})

    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path :'comments',
        populate:{
            path :'user'
        }
    })
    .exec(function(err,posts){
          return res.render('home',{
                posts :posts
            })
    })
}