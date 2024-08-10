const express = require('express');
const router = express.Router();
const Post = require('../../Models/Posts')

router.use(express.json())
const  { getPosts, createPost, updatePost, getByPostId, deletePost, upvote, downVote} = require('../../controllers/postController')

//get all posts

router.route('/')
.get(getPosts)
.post(createPost)

router.route('/:postId')
.get(getByPostId)
.delete(deletePost)
.put(updatePost)

router.route('/upvote/:postId')
.put(upvote)

router.route('/downvote/:postId')
.put(downVote)




module.exports = router
