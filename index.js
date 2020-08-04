const express = require('express');
const cookieParser =require('cookie-parser');
const port =8000;
const app=express();
//
const db =require('./config/mongoose');


//used for session cookie
const session =require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-auth');
const passportJWT =require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore =require('connect-mongo')(session);
const sassMiddleware =require('node-sass-middleware');
const flash =require('connect-flash');
const customMware=require('./config/middleware');

//setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
//
app.use(sassMiddleware({
    src :'./assests/scss',
    dest :'./assests/css',
    debug :true,
    outputStyle :'extended',
    prefix:'/css'
}))

//urlendoded
app.use(express.urlencoded());

//
app.use(cookieParser());

//acces static files
app.use(express.static('./assests'));

//make the uploads path avaliable to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


//
app.use(session({
    name :'manual_authentication',
    //todo  change the secret before deployment in production mode
    secret :'blahblahsomething',
    saveUninitialized :false ,
    resave :false,
    cookie :{
        maxAge :(100 * 60 * 100)
    },
    store : new MongoStore({

        mongooseConnection : db,
        autoRemove : 'disabled'
    },function(err){
        console.log(err || 'connect to mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use (customMware.setFlash);
//access router module
app.use('/',require('./routes/index'));

//app.use('/user',require('./routes/user'));

// port check
app.listen(port,function(err){
    if (err){
        console.log(`error occured at : ${port}`);
    }
    else{
        console.log(`port running successfully at port :${port}`);
    }
})