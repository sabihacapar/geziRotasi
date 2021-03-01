const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const { response } = require('express');




router.get('/', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/addOrEdit", {
        viewTitle: "Yeni Kayıt"
    });
});



router.get('/anasayfa', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/anasayfa", {

    });
});
router.get('/update', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/update", {

    });
});

router.get('/hakkinda', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/hakkinda", {

    });
});
router.get('/ankara', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/ankara", {

    });
});

router.get('/iletisim', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/iletisim", {

    });
});


router.get('/gaziantep', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/gaziantep", {

    });
});
router.get('/index', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/index", {

    });
});
router.get('/addOrEdit', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/addOrEdit", {

    });
});


router.get('/malatya', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/malatya", {

    });
});

router.get('/nevsehir', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/nevsehir", {

    });
});

router.get('/sanliurfa', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/sanliurfa", {

    });
});
router.get('/trabzon', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/trabzon", {

    });
});
router.get('/darende', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/darende", {

    });
});
router.get('/home', (req, res) => {
 
        res.render("./user/home");
   
});
router.get('/list', (req, res) => {

    User.find((err, docs) => {
        if (!err) {
            res.render('./user/list', {
                list: docs
            });
        }
        else {
            console.log('error:' + err);
        }
    })
})
//giris routes
//giriş formunu getir
router.get('/login', (req, res) => {
    //res.json('sample text');//ekranda çıkan mesaj burada yer alır
    res.render("./user/login", {

    });
});
router.post('/login', (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/user/anasayfa',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);

});



//Router Controller for UPDATE request
router.post('/', (req,res) => {
  
    insertRecord(req, res);
    

    });
//
function insertRecord(req, res) {//yeni kayıt eklemek için gerekli olan fonksiyon

    const user = new User();//ilk olarak bir nesne oluştururuz daha sonra oluşturulan nesnenin argümanını veritabanına eklemek için
    //veritabanına eklemek istediğimiz bilgileri kullanırız.
    user.name = req.body.name;
    user.surname = req.body.surname;

    user.email = req.body.email;
    user.mobile = req.body.mobile;
    user.city = req.body.city;
    user.address = req.body.address;
    user.age = req.body.age;
    user.gender = req.body.gender;

    user.password = bcrypt.hashSync(req.body.password, 8)//şifreyi hashlemek için bcrypt kullanılır.



    user.save((err, doc) => {//aldığımız bilgileri kaydetmek için save methodu kullanılır
        if (!err) {//eğer hatalı değilse giriş sayfasına yönlendirir.
            res.redirect('/user/login');
        } else {
            console.log('Error during record insertion:' + err);
        }
    });



}
/*
//Creating a function to update data in MongoDB
router.post('/update',(req, res) =>{
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
    if (!err) { res.redirect('/user/update'); }
    else {
    if (err.name == 'ValidationError') {
    handleValidationError(err, req.body);
    res.render("course/courseAddEdit", {
    //Retaining value to be displayed in the child view
    viewTitle: 'Update Course Details',
    user: req.body
    });
    }
    else
    console.log('Error during updating the record: ' + err);
    }
    });
    });
     
   
     
    //Creating a function to implement input validations
    function handleValidationError(err, body) {
    for (field in err.errors) {
    switch (err.errors[field].path) {
    case 'name':
    body['nameError'] = err.errors[field].message;
    break;
    default:
    break;
    }
    }
    }
   
    //Router to update a course using it's ID
    router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
    if (!err) {
    res.render("user/addOrEdit", {
    viewTitle: "Update Course Details",
    user: doc
    });
    }
    });
    });

  

*/

/*
//update an user
router.post( '/update'  ,(req, res)=> {
    let userID = req.body.userID

    const updateData = {
        name = req.body.name,
        surname = req.body.surname,
        email = req.body.email,
        mobile = req.body.mobile,
        city = req.body.city,
        address = req.body.address,
        age = req.body.age,
        gender = req.body.gender
    }
    User.findByIdAndUpdate(userID,{$set:updateData})
    
    
});
*/
// ROUTE TO SHOW UPDATE ELEMENT
router.get('/edit/:id', (req, res, next) => {
    console.log(req.params.id);
    // res.send(req.params.id);
    User.findOneAndUpdate({_id: req.params.id},req.body, { new: true }, (err, docs)=>{
        console.log(docs);
        
        console.log(docs.name);
        
        // console.log(docs._id);
        
        res.render('user', {user:docs});
    })
});





// ROUTE TO UPDATE ELEMENT
router.post('/edit/:id', (req, res, next) => {
    // let team = {};
    
    // const {
    //     name,
    //     players,
    //     coach
    // } = req.body;

    // team.name = name;
    // team.players = players;
    // team.coach = coach;
    // console.log(team);
    
    User.findByIdAndUpdate({_id: req.params.id},req.body, (err)=>{
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.redirect('/');
        }
    })
    // next();
});



router.get('/:id',(req, res)=>{
    User.findByIdAndDelete({_id:req.params.id}, err=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    });
})


router.get('/login', (req, res) => {
    res.json('/user/login');
});
router.get('/addOrEdit', (req, res) => {
    res.json('/user/addOrEdit');
});

router.get('/anasayfa', (req, res) => {
    res.json('/user/anasayfa');
});
router.get('/update', (req, res) => {
    res.json('/user/update');
});



router.get('/hakkinda', (req, res) => {
    res.json('./user/hakkinda');
});

router.get('/ankara', (req, res) => {
    res.json('./user/ankara');
});


router.get('/iletisim', (req, res) => {
    res.json('./user/iletisim');
});
router.get('/gaziantep', (req, res) => {
    res.json('./user/gaziantep');
});

router.get('/index', (req, res) => {
    res.json('./user/index');
});


router.get('/malatya', (req, res) => {
    res.json('./user/malatya');
});

router.get('/nevsehir', (req, res) => {
    res.json('./user/nevsehir');
});

router.get('/sanliurfa', (req, res) => {
    res.json('./user/sanliurfa');
});
router.get('/trabzon', (req, res) => {
    res.json('./user/trabzon');
});

//postman için ekleme silme güncelleme
router.post('/user/login', async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await User.login(email, password);
        res.status(200).send(user);



    } catch (e) {
        res.status(400).send();

    }

});

//ekleme
router.post('/users', (req, res) => {//post request atılmasının nedeni body de istenilen değeri göndermek 
    //console.log(req.body);
    const user = new User(req.body);

    user.save().then((u) => {
        res.status(201).send(u);//başırılı dönüş sağlandığını göstermek için 201 dönderildi

    }).catch((e) => {
        res.status(400).send(e);//eğer bir hata olursa 401 döner
    });

    // res.send(req.body);

});
//arama
router.get('/users', (req, res) => {
    User.find({})
        .then(users => res.status(200).send(users))
        .catch(e => res.status(500).send(e));

});

//users:id için
//postman da users/123 dediğimiz zaman sonucumuzu req.params olarak terminal ekranında görebiliriz.
//yani id:'123' ü terminalde görürüz.
router.get('/users/:id', (req, res) => {

    //console.log(req.params);
    const { id } = req.params;
    User.findById(id)
        .then(user => {
            if (user) {
                res.status(200).send(user);

            } else {
                res.status(400).send();
            }
        })
        .catch(e => res.status(500).send(e));



});
//put ile güncelleme servislerini açarız

//name,password ve email dışında kabul almaz bu kısmın try catch blogundan önce biter
router.put('/users/:id', async (req, res) => {
    const allowedUpdates = ['name', 'password', 'email'];
    const keys = Object.keys(req.body);
    const isValid = keys.every(x => allowedUpdates.includes(x));
    if (!isValid) {
        return res.status(400).send('istek gecersiz');

    }
    try {
        const { id } = req.params;

        //const user =await User.findByIdAndUpdate(id,req.body,{new :true,runValidators:true});

        const user = await User.findById(id);
        keys.forEach(key => user[key] = req.body[key]);
        const newUSer = await user.save();


        if (newUser) {
            res.status(200).send(newUser);
        } else {
            res.status(404).send();
        }


    } catch (e) {
        res.status(500).send(e);
    }


});






module.exports = router;