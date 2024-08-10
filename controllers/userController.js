const { User } = require('../Models')

async function getUser(req,res) {
    try {
        const result = await User.find({})
        res.status(200).json(result)
    }
    catch (err) {
        res.status(500).json({ message: 'server error' })
    }
}

async function postUser(req,res) {
    const username = req.body.username
    const password = req.body.password
    try {
        const newUser = await User.create({
            username,
            password
        })

        res.status(200).json(newUser)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: 'broke it bro' })
    }
}

async function getByUser(req,res){
    try{
        const result = await User.findOne({username: req.params.username})
        .populate('posts');
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(404).json({message: 'username not found'})
        }
    }
    catch(err){
        res.status(500).json({message: 'server error'})
    }
}

async function deleteByUser(req,res) {
    try{
        const result = await User.findOneAndDelete({
            username: req.params.username
        })

        if(result) {
            res.status(200).json({message: `${req.params.username} has been deleted`})
        }
        else{
            res.status(404).json({message: 'username to found'})
        }
    }
    catch(err){
        res.status(500).json({message: 'server error'})
    }
}


module.exports = {getUser, postUser, getByUser, deleteByUser}