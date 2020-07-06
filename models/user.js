// to access mongoose
const mongoose =require('mongoose');

const multer =require("multer");
const path=require("path");
const AVATAR_PATH =path.join('/uploads/users/avatars');

// to setup schema
const userSchema =new mongoose.Schema({
    email :{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    name :{
        type:String,
        required:true
    },
    avatar :{
      type:String
    }
},{
    timestamps:true
});

//creating storage to store the file upload(AVATAR)
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  })

// static functions/methods
userSchema.statics.uploadedAvatar = multer({storage :storage}).single('avatar');
userSchema.statics.avatarPath =AVATAR_PATH;

const User =mongoose.model('User',userSchema);

module.exports = User;