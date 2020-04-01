const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    first_name : String,
    last_name : String,
    email : {type:String, required:true, unique : true },
    password:{type:String,required:true},
    adresse: String

}); 

UserSchema.pre('save' , function  (next) {

  // if (!this.isModified('passport')){
    //  return next();}

    //generate salt value
    bcrypt.genSalt(10, (err,salt)=> {
        if(err) { 
            return next(err);
        }
        // Use this salt    value to   hash password
        bcrypt.hash(this.password,salt,(err,hash) => {
            if(err) {
                return next(err);
            }
        this.password = hash; 
        next();
        })
    })
})

//Custom method to check the password correct when login
UserSchema.methods.isPasswordMatch = function(plainPassword, hashed, callback) {
    bcrypt.compare(plainPassword, hashed, (err, isMatch) => {
      if (err) {
        return callback(err);
      }
      callback(null, isMatch);
    });
  }


const User = mongoose.model('User', UserSchema);

module.exports= User ;