const LocalStrategy=require('passport-local').Strategy;
const mongoose =require('mongoose');

const bcrypt =require('bcryptjs');
//load user model
const User =require('../models/user.model');
const Admin =require('../models/admin.model');



//passport authentication(yetkilendirme) modülüdür,web uygulamalarında  oturum denetimini 
//bu sosyal ağların aracılığıyla yönetilir.
module.exports=function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done) => {//localstrategy de gerekli olan strategy yazılır ve onlar kontrol edilir.

            //match user
            User.findOne({email:email})//findOne methodu ile email aranır.
            .then(user => {
                if(!user){//eğer kullanıcı yoksa hata mesajı döner
                    return done(null, false,{message:'That email is not registered'});

                }
                //match password
                bcrypt.compare(password,user.password,(err,isMatch) =>{//şifrelenmiş şifre için bcrypt
                    if(err)throw err;//eğer hata varsa hata döner

                    if(isMatch){//eşleşme için 
                        return done(null, user);
                    }else{
                        return done(null,false , {message:'Password incorrect'});//şifre yanlışsa hata mesajı döner
                    }


                });
            })
            .catch(err =>console.log(err));

        })
    );

    passport.serializeUser((user,adone)=> {//passport un serileştirilmesi için serializeUser kullanılır.
        done(null, user.id);
    });

    passport.deserializeUser((id, done) =>{//seriyi kaldırmak için de deserializeUser kullanılır.
        User.findById(id, (err, user)=>{//findByid ile kullanıcının id si aranır ve ona göre serileştirme kalkar.
            done(err,user);
        });
    });
    

}




//admin girişi için 

module.exports=function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done) => {//localstrategy de gerekli olan strategy yazılır ve onlar kontrol edilir.

            //match user
            Admin.findOne({email:email})//findOne methodu ile email aranır.
            .then(admin => {
                if(!admin){//eğer kullanıcı yoksa hata mesajı döner
                    return done(null, false,{message:'That email is not registered'});

                }
                //match password
                bcrypt.compare(password,admin.password,(err,isMatch) =>{//şifrelenmiş şifre için bcrypt
                    if(err)throw err;//eğer hata varsa hata döner

                    if(isMatch){//eşleşme için 
                        return done(null, admin);
                    }else{
                        return done(null,false , {message:'Password incorrect'});//şifre yanlışsa hata mesajı döner
                    }


                });
            })
            .catch(err =>console.log(err));

        })
    );

    passport.serializeUser((admin,done)=> {//passport un serileştirilmesi için serializeUser kullanılır.
        done(null, admin.id);
    });

    passport.deserializeUser((id, done) =>{//seriyi kaldırmak için de deserializeUser kullanılır.
        Admin.findById(id, (err, admin)=>{//findByid ile kullanıcının id si aranır ve ona göre serileştirme kalkar.
            done(err,admin);
        });
    });
    

}
