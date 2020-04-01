const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

router.post('/login', (req,res,next) =>  {
  const email = req.body.email;
  const password = req.body.password;
 
  const query = {email};
  // check the user exists
  User.findOne(query, (err,user) => {
      if (err) {   
          res.send({
              success:false,
              message:'Error, try egain'
          });
      }
      if(!user) {
        res.send({
            success:false,
            message:'Error, account not found'
        });
      }

      //Check if the password is correct
    user.isPasswordMatch(password, user.password, (err, isMatch) => {

        //Invalid password
        if (!isMatch) {
          return res.send({
            success: false, 
            message: 'Error, Invalid Password'
          });
        }

      //token validity in second
       const ONE_WEEK = 604800 ;
       //generating the token 
       const token = jwt.sign({user}, process.env.SECRET, {expiresIn: ONE_WEEK});
    
       // user is valid
        let returnuser = {
            first_name: user.first_name,
            email: user.email,
            id : user._id,
            token 
        }
        return res.send({
            success : true ,
            message: ' you can login now',
            user: returnuser
        })
  })
})
})

router.post('/register', (req,res,next) => {
   let newuser = new User({
       first_name: req.body.first_name,
       last_name: req.body.last_name,
       email: req.body.email,
       password: req.body.password,
       adresse: req.body.adresse
   });
console.log(newuser);
newuser.save((err, user) => {
    if (err) {
    
        return res.send({
            success: false,
            message: 'failed to save the user'
        });
    }
    return res.send({
        success: true,
        message: 'user saved',
        user
    });
});
});

module.exports = router;