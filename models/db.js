const mongoose =require('mongoose');




//const validator = require('validator');

const connectionUrl = 'mongodb://localhost:27017/gezirotasi1';//mongodb n,n localhostunu verdik

mongoose.connect((connectionUrl), {
    useUnifiedTopology: true,
    useCreateIndex: true, //indexleme işlemini kullanması için
    useNewUrlParser: true 
});




require('./user.model');
