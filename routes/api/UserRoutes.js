
const express = require('express');
const router = express.Router()
const { User } = require('../../Models')

router.use(express.json())

const { getUser , postUser, getByUser, deleteByUser, addFriends, deleteFriends, updateUser}= require('../../controllers/userController')

router.route('/')
.get(getUser)
.post(postUser)

router.route('/:userId')
.get(getByUser)
.delete(deleteByUser)
.put(updateUser)

router.route('/friends/:userId')
.put(addFriends)
.delete(deleteFriends)

 module.exports = router