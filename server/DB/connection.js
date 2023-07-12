const mongoose = require('mongoose')

const db = process.env.DATABASE 

module.exports = mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{console.log('connection succesfull')}).catch((err)=>{console.log(err)})