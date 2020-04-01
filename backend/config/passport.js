

var JwtStrategy = require('passport-jwt').Strategy,
   ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');


module.exports= function(passport){
 
    var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user)  {

        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } 
})
}))
}
