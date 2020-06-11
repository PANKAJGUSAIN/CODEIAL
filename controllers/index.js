const Post =require('../models/post')

const User =require('../models/user')

// partials works
//module.exports.home=function(req,res){
    //basic way of getting the data
        //Post.find({},function(err,posts){
        //   return res.render('home',{
        //        posts :posts
        //    })
        //})

    // populate the user of each post
    //Post.find({})
    //.populate('user')
    //.populate({
    //    path :'comments',
    //    populate:{
     //       path :'user'
     //   }
    //})
    //.exec(function(err,posts){
    //   
     //   User.find({},function(err,users){
    //        return res.render('home',{
     //           posts :posts,
     //           all_users :users
    //        })
    //    })
    //})
//}

    // using async await to make a cleaner code
module.exports.home= async function(req,res){

    try{
        let posts=await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path :'comments',
                populate:{
                    path :'user'
                }
            });

        let users=await User.find({});
            
        return res.render('home',{
        posts :posts,
        all_users :users
        })

    }catch(err){
        req.flash('error',err);
        return
    }
}