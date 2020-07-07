const passport=require('passport');
//importing the strategy
const JWTStrategy=require('passport-jwt').Strategy;
//importing a module that will help us extract jwt from the header
const ExtractJWT =require('passport-jwt').ExtractJwt;
const User = require('../models/user');

//while defining jwt we need to have some options
//1. get the token(bearer)
//2. key for encrypt and decrypt
//option short as ops
let ops ={
    //to extract a key called bearer
    jwtFromRequest :ExtractJWT.fromAuthHeaderAsBearerToken(),
    //encryption and decrytion key for token
    secretOrKey:"CODIEAL"
}

//authentication
passport.use(new JWTStrategy(ops,function(jwtPayload,done){
     User.findById(jwtPayload._id,function(err,user){
         if(err){
             console.log('**** error in finding user from jwt',err);
             return;
         }
         if(user){
             return done(null,user);
         }
         else{
             return done(null,false);
         }
     })

}))

module.exports =passport;