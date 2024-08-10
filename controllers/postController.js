const { Post, User } = require('../Models')

async function getPosts(req, res) {
    try {
        const posts = await Post.find()
        if (posts) {
            res.status(200).json(posts)
        }
        else {
            res.status(404).json({ message: "no posts found" })
        }
    }
    catch (err) {
        res.status(500).json({ message: 'server error' })
    }
}

async function createPost(req, res) {
    try {
        const post = await Post.create(
            req.body
        )
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { posts: post._id } },
            { new: true }
            )
}
    catch (err) {
    console.log(err)
}
}

async function getByPostId(req, res){
    try{
    const post = await Post.findById(req.params.postId);
    if(post){
        res.status(200).json(post)
    }

    }
    catch(err){
        res.status(500).json('server error')
    }
}

async function deletePost(req,res) {
    try{
        const deletedPost = await Post.findByIdAndDelete(req.params.postId)
        
        const updateUser = await User.findByIdAndUpdate(
            {_id: deletedPost.userId},
            {$pull : {post: deletedPost._id} }
        )

        if(deletedPost && updateUser){
            res.status(200).json(updateUser)
        }
        else{
            res.status(404).json('sum broke')
        }
    }
    catch(err){
        res.status(500).json('server error')
    }
}

module.exports = { getPosts, createPost, getByPostId, deletePost}