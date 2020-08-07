// const passport =require('passport');
// const googleStrategy =require('passport-google-oauth').OAuth2Strategy;
// const crypto =require('crypto');
// const User =require('../models/user');

// //now we nee to tell passport to use google strategy and then we need to add some options
// passport.use(new googleStrategy({
//         clientID :"311983116104-kcudoicqckvjdk1k9irmp1s01rrjauov.apps.googleusercontent.com",
//         clientSecret :"dSjzQlN_yHsShtzsgPDhc5Po",
//         callbackURL :"http://localhost:8000/user/auth/google/callback"
//     },
//     //accesstoken - the token we get from user
//     // refreshtoken- if our access token gets expired we asked for another token and then use it
//     function(accessToken,refreshToken,profile,done){
//         //find a user
//         User.findOne({email : profile.emails[0].value}).exec(function(err,user){
//             if(err){
//                 console.log('****error in google strategy',err);
//                 return;
//             }

//             //console.log(accessToken,refreshToken);
//             console.log(profile);
            
//             if(user){
//                 //if found user use as req.user
//                 return done(null,user);
//             }else{
//                 // if not found ,create a user and set it as req.user(means sign in)
                
//                 User.create({
//                     name :profile.dsiplayName,
//                     email :profile.emails[0].value,
//                     password : crypto.randomBytes(20).toString('hex')
//                 },function(err,user){
//                     if(err){
//                         console.log('error in creating user',err);
//                     }
//                     else{
//                         return done(null,user);
//                     }
//                 })
//             }
        
//         })
//     }

// ))

// module.exports =passport;

const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

const env=require('./environment');
// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID :env.clientID,
    clientSecret :env.clientSecret,
    callbackURL :env.callbackURL,
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;
