const express = require('express');
const path=require('path');
require('./models/db');

const exphbs=require('express-handlebars');
const bodyparser = require('body-parser');

const userController = require('./controllers/userController');
const passport = require('passport');

const flash =require('connect-flash');
const session =require('express-session');

const app =express();

//passport config
require('./config/passport')(passport);

app.use(bodyparser.urlencoded({
    extended:true
}));
//express session
 app.use(session({
     secret:'secret',
     resave:true,
     saveUninitialized:true
 }));
//passport middleWare
app.use(passport.initialize());
app.use(passport.session());

 //connect flash
 app.use(flash());



app.use(bodyparser.json());
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname + '/views/layouts/'}));
app.use(express.static('public'));
app.set('view engine','hbs');
app.listen(process.env.PORT || 3000,()=>{
    console.log('Server ayakta');
});

app.use('/user',userController);