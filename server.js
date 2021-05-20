const express = require('express');
const path = require('path');
require('./models/db');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')//

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')//listeleri görüntüleyebilmek için
const bodyparser = require('body-parser');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');//admin sayfasının controllerini yapmak için
const postController=require('./controllers/postController');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const http = require('http');//http modulüdür import edilir.
const socketio = require('socket.io');//socket.io kütüphanesini kurduk burada kullanıyoruz
const { addUser, getUser, removeUser, getUserListInChannel } = require('./public/js/users');





const fileUpload=require('express-fileupload');

const app = express();

const server = http.createServer(app);//bu kısımda server içinde app i alarak portu ayağa kaldırmak için server.listen kullandık

const io = socketio(server);//io ya server i aldık
const publicPAthDirectory = path.join(__dirname,'./views/user');//public klasörünün içine gider


//passport config
require('./config/passport')(passport);





app.use(bodyparser.urlencoded({
    extended: true
}));
//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
//passport middleWare
app.use(passport.initialize());
app.use(passport.session());


//connect flash
app.use(flash());

app.use(fileUpload());

app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' ,handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.use(express.static('public'));



app.set('view engine', 'hbs');





    app.use(express.static(publicPAthDirectory));//


    io.on('connection', function (socket) { // Burada input-output kısmına connection durumu olduğunda bir bir kanal açıyoruz her kullanıcı için.
        //console.log('a user connected');// Console bir kişi geldiğini yazdırıyoruz.
        
       
        socket.on('chat message', function (msg) { // gönderilen mesaj yakalanır
            io.emit('chat message', msg); // Yakalanan bu mesajı bize bağlı olan bütün açık kanallara emit(yayılma) ediyoruz.
        });
    
    
    
        socket.broadcast.emit('kullanici','Yeni kullanıcı katıldı');//bağlı olan kullanıcılara mesajı gösterir.
      
     
    
      //bir connection kaybolduğunda verilecek olan mesaj
      socket.on('disconnect',()=>{
        //bu işlem broadcast yerine io.emit ile de yapılabilir
        socket.broadcast.emit('kullaniciayrildi','Kullanıcı ayrıldı');
      });
    
    });
    
    
    
  



//üst kısımda sapp yerine server kullandığımız için burada server.listen yapıldı
server.listen(process.env.PORT || 3000, () => {
    console.log('Server ayakta');
});

app.use('/user', userController);
app.use('/admin', adminController);
app.use('/post',postController);





