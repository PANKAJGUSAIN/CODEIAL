const User = require('../models/user');


module.exports.signin=function(req,res){
    //console.log('reached');
    if(req.isAuthenticated()){
       return res.redirect('/user/profile')
    }
    return res.render('login.ejs');
}

module.exports.login=function(req,res){
    //console.log('reached');
    if(req.isAuthenticated()){
      return  res.redirect('/user/profile')
    }
    return res.render('login.ejs');
}

module.exports.profile=function(req,res){
    //console.log('reached');
    User.findById(req.params.id,function(err,user){
        return res.render('profile.ejs',{
            profile_user :user
        });
    })
    
}

// to update user profile
module.exports.update=function(req,res){
    if(req.user.id ==req.params.id){
        User.findByIdAndUpdate(req.params.id,{name:req.body.name ,email:req.body.email},function(err,user){
            return res.redirect('back');
        })
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

//get the user data
module.exports.create =function(req,res){
        console.log(req.body)
        if (req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }

        User.findOne({email :req.body.email},function(err,user){
            if (err){
                console.log('error in finding email');
                return
            }
            if(!user){
                User.create(req.body,function(err,User){
                    if(err){
                        console.log('error in creating user while signing up');
                        return
                    }
                    return res.redirect('/user/login');
                })
            }
            else{
                return res.redirect('back');
            }
        });
};



//to create user sessing
module.exports.createSession= function(req, res){
        req.flash('success','LOGGED IN SUCCESSFULLY');
        return res.redirect('/');
}

module.exports.destroySession= function(req, res){
    req.logout();
    req.flash('success','YOU HAVE LOGGED OUT');

    return res.redirect('/');
}


