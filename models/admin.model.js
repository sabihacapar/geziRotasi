const mongoose =require('mongoose');
const validator = require('validator');
const bcrypt =require('bcrypt');


const adminSchema = new mongoose.Schema({

    
    name: {
        type: String,
        required: true//olması zorunlu olan alan olduğunu bildirir
    },
    surname: {
        type: String,
        required: true//olması zorunlu olan alan olduğunu bildirir

    },
    email: {
        type: String,
        required: true,//olması zorunlu olan alan olduğunu bildirir
        lowercase: true,//eğer harfler büyükse küçük harfe dönüştürür 
        trim: true,//e mail yazılırken arada boşluk varsa boşluğu kapatır
        unique:true, //veritabanında bu mailden yalnız 1 tane olabilir
        validate(value) {
            if (!validator.isEmail(value)) {//email formatının kontrolünü yapar
                throw new Error('E mail standartlarına uymuyor');
            }
        }

    },
   
    password:{
        type:String,
        required:true,
        minlength:6
    }
});
const Admin=mongoose.model('Admin',adminSchema);
module.exports=Admin;
