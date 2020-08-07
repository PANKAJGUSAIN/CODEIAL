const User =require('../../../models/user');
const jwt  =require('jsonwebtoken');
const env=require('../../../config/environment');

//whenever a user name and password is recieved we need to find that user and generate the 
//jsonwebtoken corresponds to it.


module.exports.createSession= async function(req, res){
    try{
        //finds the user
        let  user =await User.findOne({email :req.body.email});
        //if user or its password doesnot match
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message :"invalid username or password"
            })
        }
        //if matched
        return res.json(200,{
            message:"sign in successfull , here is your token",
            data :{
                token :jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn :100000})
            }
        })
    }
    catch(err){
        console.log('****error',err);
        return res.json(200,{
            message:'internal server error'
        });
    }
}