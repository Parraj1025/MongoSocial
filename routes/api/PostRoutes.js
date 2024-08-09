const express = require('express')
const router = express.Router()



router.get('/', async (req,res) => {
    const posts = await db.collection('Posts').find({}).toArray()
    res.json(posts)

    console.log('POST POST route working')
})


module.exports = router
