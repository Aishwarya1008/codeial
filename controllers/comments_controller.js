const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes/posts');

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            });
            post.comments.push(comment._id);
            post.save();
            return res.redirect('/');
        }
    } catch(err){
        console.log('Error', err);
        return;
    }

}

module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id)
        .populate('post');
        if(comment){
            if(comment.user == req.user.id || comment.post.user == req.user.id){
                let post = await Post.findById(comment.post);
                if(post){
                    let index = post.comments.indexOf(req.params.id);
                    if(index > -1){
                        post.comments.splice(index, 1);
                        post.save();
                    }
                }
                comment.remove();
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