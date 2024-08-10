
const express = require('express');
const router = express.Router()
const { User } = require('../../Models')

router.use(express.json())

const { getUser , postUser, getByUser, deleteByUser, addFriends }= require('../../controllers/userController')

router.route('/')
.get(getUser)
.post(postUser)

router.route('/:username')
.get(getByUser)
.delete(deleteByUser)

router.route('/friends/:userId')
.put(addFriends)

 module.exports = router