// to access mongoose
const mongoose = require('mongoose');
//to connect it
mongoose.connect('mongodb://localhost/codeial_development');
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