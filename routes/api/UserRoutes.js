
const express = require('express');
const router = express.Router()
const { User } = require('../../Models')
const db = require('../../config/connection')

router.use(express.json())

router.get('/', async  (req,res) => {
    try {
    const result = await User.find({})
    res.status(200).json(result)
    }
    catch(err){
        res.status(500).json({message: 'server error'})
    }
 })
 
router.post('/', async (req,res) => {
    const username = req.body.username
    const password = req.body.password
    try {
        const newUser= await User.create({
            username,
            password
        })

        res.status(200).json(newUser)
    }
    catch(err){
        console.log(err)
        res.status(400).json({message:'broke it bro'})
    }
 })
 
router.put('/', async (req,res) =>{
   
 })
 
 
module.exports = router