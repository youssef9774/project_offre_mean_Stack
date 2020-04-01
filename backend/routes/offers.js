 const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')
const Offer = require('../models/offer');

//---------------add offre-------------
router.post('/add',  passport.authenticate('jwt', { session: false }), function(req, res) {
   let offre = new Offer ({
       titre:req.body.titre,
       prix:req.body.prix,
       description:req.body.description
   })

    offre.save((err, offre) => {
    if(err) {
    throw err;
        return  res.send({
              success : false,
              message : 'Error , try again '
          })
      } 
       if(!offre) {
         return  res.send({
               success : false,
               message : 'failed to save this offre '
           })
       }
       console.log(offre);
       return res.send({
            success : true,
            offre,
            message : 'this offer is saved'
        })
   } 
   )
})

//--------List recherche-----------
router.get('/list',passport.authenticate('jwt', {session:false}),(req,res) => {
    const titre = req.body.titre;
  Offer.find( (err, offre)=>{
    if (err) {
      return res.json({
        success: false,
        message: 'Error while reteriving the tasks'
      });
    }

    return res.json({
      success: true,
      offre
    });
  });
});

//-----------------update offer--------------
router.get('/update/:id',(req,res) => {
  Offer.findOneAndUpdate({_id: req.params.id} , (err,rec) => {
    if (rec) {
      
      res.status(500).json({ error :err});
      
    } else {
      res.status(200).json(rec)
   } 
  });
  });
//-------
router.put('/update/:id',(req,res) => {
  Offer.findOneAndUpdate({_id: req.params.id} , req.body).then(rec => {
    if (rec) {
      
      res.status(200).json({ message :"update success"});
      
    } else {
      res.status(500).json({ message :"error"})
   } 
  });
  });

  



//--------delete offre------
router.delete('/remove/:id',passport.authenticate('jwt', {session:false}),(req,res) => {
  const Id = req.params.id;
  Offer.remove({ _id: Id }, (err) => {
      if(err) {
        return res.json({
          success: false,
          message: 'Failed to delete the offre'
        });
      }

      return res.json({
        success: true,
        message: 'offre deleted'
      });
  });
})

module.exports= router ;

/*
const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const a = require('../models/offer')
/*
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
    let newuser = new a({
        titre: req.body.titre,
        prix: req.body.prix,
        description: req.body.description
     
    });
 console.log(newuser);
 newuser.save((err, a) => {
     if (err) {
     
         return res.send({
             success: false,
             message: 'failed to save the user'
         });
     }
     return res.send({
         success: true,
         message: 'user saved',
         a
     });
 });
 });
 
 module.exports = router;*/