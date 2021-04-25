const passport = require('passport');
const passportGoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new passportGoogleStrategy({
    clientID: "974210960158-k9h531d1glvr2l08vil31vkdn8lrk0v7.apps.googleusercontent.com",
    clientSecret: "e7wWopeGYbbHyO5zNnn85Kb0",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
}, function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}, function(err, user){
        if(err){
            console.log('Error', err);
            return;
        }
        console.log(accessToken, refreshToken);
        console.log(profile);
        if(user){
            return done(null, user);
        } else {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){
                    console.log('Error', err);
                    return;
                }
                return done(null, user);
            });
        }
    });
}));

module.exports = passport;