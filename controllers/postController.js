const { Post, User } = require('../Models')

//Get all Posts

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

//Create a new post
//Send userId and Post 

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

//Update Post
async function updatePost(req,res){
    try{
    const updatedPost = await Post.findByIdAndUpdate(
        {_id: req.params.postId},
        {post: req.body.post}
    )
    if(updatedPost){
        res.status(200).json(updatePost)
    }
    else{
        res.status(404).json('unable to update post')
    }
    }
    catch(err){
        res.status(500).json('server error')
    }
}


//Get by post Id

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

//deletePosts

async function deletePost(req,res) {
    try{
        const deletedPost = await Post.findByIdAndDelete(req.params.postId)
        
        const updateUser = await User.findByIdAndUpdate(
            {_id: deletedPost.userId},
            {$pull : {posts: req.params.postId} },
            {new: true}
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

//upvote a post 

async function upvote(req,res){
    try{
        const liked = await Post.findByIdAndUpdate(
            {_id: req.params.postId},
            {$inc:{ "meta.upvotes": 1}},
            {new: true}
        )

        if (liked){
            res.status(200).json(liked)
        }
    }
    catch(err){
        res.status(500).json('server error')
    }}

//remove Upvote

async function downVote(req,res){
    try{
        const unLiked = await Post.findByIdAndUpdate(
            {_id: req.params.postId},
            {$inc:{ "meta.upvotes": -1}},
            {new: true}
        )

        if (unLiked){
            res.status(200).json(unLiked)
        }
    }
    catch(err){
        res.status(500).json('server error')
    }}

module.exports = { getPosts, createPost, getByPostId, deletePost, upvote, downVote, updatePost }