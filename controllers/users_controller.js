module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile Page'
    });
}

module.exports.usersPosts = function(req, res){
    return res.send('<h1>User Posts Working fine</h1>');
}