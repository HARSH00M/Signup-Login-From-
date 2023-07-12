

const express = require('express');
const router = express.Router();


router.get('/login',(req,res)=>{
    console.log("get request")
})
router.post('/login',(req,res)=>{
    console.log("Post Login connection Established...........")
    console.log(req.body)
    res.json({message:req.body})
})

module.exports = router;