require('../DB/connection')
const User = require('../DB/userSchema')
const express = require('express');
const router = express.Router();


router.get('/login',(req,res)=>{
    res.send('Login Get page')
    console.log("At login page using Get request\n")
})
router.post('/login',async(req,res)=>{

    console.log("At login page using Post request\n")
    const {name,phone,email,work,password,cpassword} = req.body;
    if(!name || !phone || !email || !work || !password || !cpassword){
        return res.status(422).json({error: "all reqirements are not yet filled"})
    }
    const user = new User({name,phone,email,work,password,cpassword})
    // await User.findOne({email:email}).then((userExist)=>{
    //     if(userExist){
    //         return res.status(422).json({error: "user all ready exist"})
    //     }
    // })
    await user.save()
    res.status(201).json({message: "you data submited"});

})

module.exports = router;