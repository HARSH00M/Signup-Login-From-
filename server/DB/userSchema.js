const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
 })

 userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.cpassword = await bcrypt.hash(this.password,12);
        this.password = this.cpassword;
    }
    next();
 })

 const User = new mongoose.model('USER',userSchema)

 module.exports = User;