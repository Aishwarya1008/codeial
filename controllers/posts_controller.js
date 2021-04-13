const Comment = require("../models/comment");
const Post = require("../models/post");


module.exports.create = async function(req, res){
    try {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch(err){
        console.log('Error', err);
        return;
    }
}

module.exports.destroy = async function(req, res){

    try {
        let id = req.params.id;
        let post = await Post.findById(id);
        if(post){
            if(post.user == req.user.id){
                post.remove();

                await Comment.deleteMany({post: req.params.id});

                return res.redirect('back');

            } else {
                return res.redirect('back');
            }
        } else {
            return res.redirect('back');
        }
    } catch(err){
        console.log('Error', err);
    }
    
}