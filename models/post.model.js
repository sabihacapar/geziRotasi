const mongoose =require('mongoose');
const validator = require('validator');
const bcrypt =require('bcrypt');


const postSchema = new mongoose.Schema({

    
    yorum:{
        type:String
    },
   post_image:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const Post=mongoose.model('Post',postSchema);
module.exports=Post;
