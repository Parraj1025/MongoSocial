const express = require('express');
const router = express.Router();
const Post = require('../../Models/Posts')

router.use(express.json())
const  { getPosts, createPost, getByPostId, deletePost} = require('../../controllers/postController')

//get all posts

router.route('/')
.get(getPosts)
.post(createPost)

router.route('/:postId')
.get(getByPostId)
.delete(deletePost)




module.exports = router
