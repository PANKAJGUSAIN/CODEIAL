const passport =require('passport');


const LocalStrategy =require('passport-local').Strategy;

const User =require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField :'email'
    },function(email,password,done){
        //find a user and estanlish the identity
        User.findOne({email:email},function(err,user){
            if (err){
                Console.log('error in finding user --> passport',err);
                return done(err);
            }
            if(!user || user.password !=password){
                console.log('invalid username/password');
                return done(null,false);
            }

            return done(null,user);
        })
    }
))



//serializing the user to decide which key to kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);

});



//de-serializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if (err){
            Console.log('error in finding user --> passport',err);
            return done(err);
        }  
        return done(null,user);
    });
});


//check if the user is authenticated
passport.checkAuthentication =function(req,res,next){

    // if the user is signed in .then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not logged in
    return res.redirect('/user/sigin');
}

passport.setAuthenticatedUser =function(req,res,next){

    if(req.isAuthenticated()){
        //req.user contains the data from the session cookie and we just sending this to the local of the views
        res.locals.user =req.user;
    }
    next();
}

module.exports =passport ;