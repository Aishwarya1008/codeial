const User = require("../models/user");

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile Page'
    });
}

module.exports.usersPosts = function(req, res){
    return res.send('<h1>User Posts Working fine</h1>');
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: 'Sign Up'
    });
}

module.exports.signIn = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'Sign In'
    });
}

module.exports.create = function(req, res){
    // let data = req.body;
    // console.log(data);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user', err);
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user', err);
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req, res){
    let data = req.body;
    console.log(data);
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}

