const Post =require('../models/post')

const User =require('../models/user')

// partials works
module.exports.home=function(req,res){
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
       
        User.find({},function(err,users){
            return res.render('home',{
                posts :posts,
                all_users :users
            })
        })
    })
}