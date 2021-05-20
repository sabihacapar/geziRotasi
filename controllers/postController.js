const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post.model');
const User=require('../models/user.model')
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const { response } = require('express');
const path=require('path');
mongoose.set('useFindAndModify', false); //update ve deletein kullanımı




router.get('/', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./post/yorum", {
        viewTitle: ""
    });
});














//Router Controller for UPDATE request
router.post('/',(req,res)=>{
   
        insert(req,res);

    
});

//
function insert(req, res) {//yeni kayıt eklemek için gerekli olan fonksiyon

    const post = new Post();//ilk olarak bir nesne oluştururuz daha sonra oluşturulan nesnenin argümanını veritabanına eklemek için
    //veritabanına eklemek istediğimiz bilgileri kullanırız.
    post.yorum=req.body.yorum;
const post_image=req.files.post_image
post_image.mv(path.resolve(__dirname,'../public/image/postimage',post_image.name))//arayüzde eklenen görseller image altındaki postimage dosyasına kaydolur

post.post_image=`/image/postimage/${post_image.name}`


    


post.save((err, doc) => {//aldığımız bilgileri kaydetmek için save methodu kullanılır
        if (!err) {//eğer hatalı değilse giriş sayfasına yönlendirir.
            res.redirect('/post/yorum');
        } else {
            console.log('Error during record insertion:' + err);
        }
    });
   // console.log(req.files.post_image.name)//.name kullanıldığı zaman yüklenen resmin ismi yazdırılır
}



router.get('/yorum',(req,res) =>{
    Post.find((err,docs)=>{
        if(!err){
            res.render("post/yorum",{
                list : docs
            });
        }
        else{
            console.log('Error in retrieving post list :' + err);

        }
        
    });

  

});

router.get('/yorum', (req, res) => {
    res.json('./post/yorum');
});
router.get('/delete/:id',(req,res) =>{
    Post.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/post/yorum');
        }else{
            console.log('Error in admin delete : ' + err);
        }
    });
})




module.exports = router;