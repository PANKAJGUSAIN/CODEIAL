// to access mongoose
const mongoose = require('mongoose');
//using environment.js to keep all keywords in one place
//const env =require('./environment');
const env = require('./environment');
//to connect it
mongoose.connect(`mongodb://localhost/${env.db}`);
//db connection
const db =mongoose.connection;

//if error while connecting
db.on('error',console.error.bind(console,'error while connection to db'));

//if runs successfully
db.once('open',function(){
    console.log('database running successfully');
})

//exporting this module
module.exports=db;