require("../DB/connection");
const  User = require("../DB/userSchema"),
  express = require("express"),
  router = express.Router(),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken');


router.get("/login", (req, res) => {
  res.send("Login Get page");
  console.log("At login page using Get request\n");
});
router.post("/register", async (req, res) => {
  console.log("At Register page using Post request\n");
  const { name, phone, email, work, password, cpassword } = req.body;

  if (!name || !phone || !email || !work || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "all reqirements are not yet filled" });
  }

  //register part
  const UserExist = await User.findOne({ email: email });
  try {

    //console.log(UserExist); Null else founded value
    if (UserExist) {
      return res.status(422).json({ error:"User Already Exists with this email" });//"INVALID CREDENTIALS" 
    }else if(password != cpassword){
      res.status(422).json({error: "Enter password is Wrong"});
    }else{
    const user = new User({ name, phone, email, work, password, cpassword });
    await user.save();
    res.status(201).json({ message: "you data submited" });
  }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  //email and password check
  const { email, password } = req.body;

 
  try {
    // emptiness check
    if(!email || !password){
      res.status(400).json({error: "Fill all the required details"})
    }
    
    const UserExist = await User.findOne({ email: email });
  
    if (UserExist) {
      //for not hashed passwords
      // const passCheck = await User.findOne(conditions)
      // // console.log(passCheck.password)
      // if (!passCheck) {
      //   res.status(401).json({ error: "INVALID CREDENTIALS" });// Incorrect Password
      // } else{
      //   res.status(200).json({message:"YOU ARE LOGGEDIn"}) //User Found and you are logedIn
      // }

      await bcrypt.compare(password,UserExist.password,(err,isMatch)=>{
        if(err){
          throw err
        }else if(!isMatch){
          res.status(401).json({ error: "INVALID CREDENTIALS" });// Incorrect Password
        }else{
          res.status(200).json({message:"YOU ARE LOGGEDIn"})//User found and loggedIn
        }
        
      })
    } else {
      res.status(404).json({ error: "INVALID CREDENTIALS" });//User Not Found
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
