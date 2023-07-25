const express=require('express'),
    dotenv = require('dotenv'),
    server = express();


dotenv.config({path:"./config.env"})
require('./DB/connection')
const PORT = process.env.PORT

//router from auth file
server.use(express.json())
server.use(require('./router/auth'))




// Middleware 
const Middleware = (req,res,next)=>{
    console.log("middleware worked");
    next();
}
 
server.get('/',Middleware,(req,res)=>{
    console.log("server connected\n")
    res.send("Ok Home page")
})


server.listen(PORT)