const fs =require('fs');
const rfs = require('rotating-file-stream');
const path =require('path');

const logDirectory =path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream =rfs.createStream('access.log',{
    interval : '1d',
    path : logDirectory
});

const development ={
    name : 'development' ,
    asset_path : '/assests',
    session_cookie_key :'blahblahsomething', 
    db :'codeial_development',
    smtp:{
        //defining properties
        service :'gmail',
        host :'smtp.gmail.com',
        port :587,
        secure :false,
        auth :{
            user :'codeial001@gmail.com',
            pass :'Pankaj-1-cap'
        }
    },

    clientID :"311983116104-kcudoicqckvjdk1k9irmp1s01rrjauov.apps.googleusercontent.com",
    clientSecret :"dSjzQlN_yHsShtzsgPDhc5Po",
    callbackURL :"http://localhost:8000/user/auth/google/callback",

    jwt_secret :"CODIEAL",
    morgan :{
        mode :'dev',
        options : {stream : accessLogStream}
    }

}

const production ={
    name :'production',
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key :process.env.CODEIAL_SESSION_COOKIE_KEY, 
    db : process.env.CODEIAL_DB,
    smtp:{
        //defining properties
        service :'gmail',
        host :'smtp.gmail.com',
        port :587,
        secure :false,
        auth :{
            user :process.env.CODEIAL_GMAIL_USERNAME,
            pass :process.env.CODEIAL_GMAIL_PASSWORD
        }
    },

    clientID :process.env.CODEIAL_GOOGLE_CLIENT_ID,
    clientSecret :process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    callbackURL :process.env.CODEIAL_GOOGLE_CALL_BACK_URL,

    jwt_secret : process.env.CODEIAL_JWT_SECRET ,
    morgan :{
        mode :'combined',
        options : {stream : accessLogStream}
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);