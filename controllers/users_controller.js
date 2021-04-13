const User = require("../models/user");

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log('error in finding user', err);
            return;
        }
        return res.render('user_profile', {
            title: 'User Profile Page',
            profile_user: user
        });
    });

}

module.exports.profileUpdate = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            if(err){
                console.log('error in updating', err);
                return;
            }
            return res.redirect('back');
        });

    } else {
        return res.status(401).send('Unathourized');
    }
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

module.exports.create = async function(req, res){
    // let data = req.body;
    // console.log(data);
    try{
        if(req.body.password != req.body.confirm_password){
            req.flash('error', 'Password and Confirm Password are not same');

            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
            if(!user){
                await User.create(req.body);
                return res.redirect('/users/sign-in');
            } else {
                req.flash('error', 'User with same email exits, try different email..!!');
                return res.redirect('back');
            }

    } catch(err){
        console.log('Error', err);
        return;
    }
}

module.exports.createSession = function(req, res){
    let data = req.body;
    console.log(data);
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'Logged out Successfully');
    return res.redirect('/');
}

