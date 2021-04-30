const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log('err in fetching the posts', err);
    //         return;
    //     }
    //     return res.render('home', {
    //         title: 'Home',
    //         posts: posts 
    //     });
    // });

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            options: {
                sort: '-createdAt'   
            },
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});

        return res.render('home', {
            title: 'Home',
            posts: posts,
            all_users: users 
        });

    } catch(err){
        console.log('Error', err);
        return;
    }
    
    
}