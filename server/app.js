const express=require('express'),
    dotenv = require('dotenv')

const server = express();


dotenv.config({path:"./config.env"})
require('./DB/connection')
const PORT = process.env.PORT

// Middleware 

const Middleware = (req,res,next)=>{
    console.log("middleware worked");
    next();
}
 
server.get('/',Middleware,(req,res)=>{
    console.log("server connected")
    res.send("Ok")
})


server.listen(PORT)