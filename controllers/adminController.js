const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const { response } = require('express');

mongoose.set('useFindAndModify', false); //update ve deletein kullanımı




router.get('/', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./admin/signup", {
        viewTitle: ""
    });
});
router.get('/anasayfa', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./admin/anasayfa", {

    });
});

router.get('/signup', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./admin/signup", {

    });
});
router.get('/hakkinda', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./admin/hakkinda", {

    });
});


router.get('/iletisim', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./admin/iletisim", {

    });
});


//giris routes
//giriş formunu getir
router.get('/signin', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./admin/signin", {

    });
});

router.post('/signin', (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/admin/anasayfa',
        failureRedirect: '/admin/signin',
        failureFlash: true
    })(req, res, next);

});





//Router Controller for UPDATE request
router.post('/',(req,res)=>{
    if(req.body._id == ''){
        insertAdmin(req,res);

    }
    else{
        updateRecord(req,res);


    }
});

//
function insertAdmin(req, res) {//yeni kayıt eklemek için gerekli olan fonksiyon

    const admin = new Admin();//ilk olarak bir nesne oluştururuz daha sonra oluşturulan nesnenin argümanını veritabanına eklemek için
    //veritabanına eklemek istediğimiz bilgileri kullanırız.
    admin.name = req.body.name;
    admin.surname = req.body.surname;
    admin.email = req.body.email;


    admin.password = bcrypt.hashSync(req.body.password, 8)//şifreyi hashlemek için bcrypt kullanılır.


    admin.save((err, doc) => {//aldığımız bilgileri kaydetmek için save methodu kullanılır
        if (!err) {//eğer hatalı değilse giriş sayfasına yönlendirir.
            res.redirect('/admin/list');
        } else {
            console.log('Error during record insertion:' + err);
        }
    });
}

function updateRecord(req,res){
    Admin.findByIdAndUpdate({ _id:req.body._id},req.body, {new :true},(err,doc)=>{
        if(!err){
            res.redirect('admin/list');
        }else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("admin/signup",{
                    viewTitle : 'Update admin',
                    admin : req.body
                });
            }else{
                console.log('Error during record update : ' + err);

            }
        }
    });

}

router.get('/list',(req,res) =>{
    Admin.find((err,docs)=>{
        if(!err){
            res.render("admin/list",{
                list : docs
            });
        }
        else{
            console.log('Error in retrieving admin list :' + err);

        }
    });



});
function handleValidationError(err,body){
    for(field in err.errors){

        switch(err.errors[field].path){

            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
                case 'surname':
                    body['surnameError'] = err.errors[field].message;
                    break;
                case 'email':
                    body['emailError'] = err.errors[field].message;
                    break;
                    default:
                        break;


        }


    }
}
router.get('/:id',(req,res)=>{
    Admin.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("admin/updateAdmin",{
                viewTitle : "Update Admin",
                admin : doc
            })
        }

    });

});

router.get('/delete/:id',(req,res) =>{
    Admin.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/admin/list');
        }else{
            console.log('Error in admin delete : ' + err);
        }
    });
})

router.get('/signin', (req, res) => {
    res.json('./admin/signin');
});
router.get('/signup', (req, res) => {
    res.json('/admin/signup');
});


router.get('/anasayfa', (req, res) => {
    res.json('./admin/anasayfa');
});




router.get('/hakkinda', (req, res) => {
    res.json('./admin/hakkinda');
});



router.get('/iletisim', (req, res) => {
    res.json('./admin/iletisim');
});





module.exports = router;