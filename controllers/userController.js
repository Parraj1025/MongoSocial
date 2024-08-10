const { User } = require('../Models')


//Get all users and display their posts and friends


async function getUser(req,res) {
    try {
        const result = await User.find({})
        .populate('posts','friends');
        res.status(200).json(result)
    }
    catch (err) {
        res.status(500).json({ message: 'server error' })
    }
}

//Create a user 

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

//Get only one user

async function getByUser(req,res){
    try{
        const result = await User.findOne({username: req.params.userId})
        .populate('posts','friends');
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

//Update a user
async function updateUser(req,res){
    try{
    const updatedUser = await User.findByIdAndUpdate(
        {_id: req.params.userId},
        {username: req.body.username},
        {password: req.body.password}
    )
    if(updateUser){
        res.status(200).json(updatedUser)
    }
    }
    catch(err){
        res.status(500).json('server error')
    }
}


//Delete a user

async function deleteByUser(req,res) {
    try{
        const result = await User.findOneAndDelete(
            {_id: req.params.userId},
            {new: true})

        if(result) {
            res.status(200).json({message: `${req.params.userId} has been deleted`})
        }
        else{
            res.status(404).json({message: 'username to found'})
        }
    }
    catch(err){
        res.status(500).json({message: 'server error'})
    }
}

//function for adding friends and updating users by
//URL/api/users/friends/:[user you want to add]
//send body with your userId 

async function addFriends(req,res){
    try{
        const newFriend = await User.findById(req.params.userId)

        const user = await User.findById(req.body.userId)

        const friendAdded = await User.findOneAndUpdate(
            {_id: user._id},
            {$addToSet:{friends: newFriend._id}},
            { new: true }
        )


        if(friendAdded){
            const addedBack = await User.findOneAndUpdate(
                {_id: newFriend._id},
                {$addToSet: {friends: user._id}},
                {new: true}
            )
            
            res.status(200).json('you are now friends')
        }
        else{
            res.status(404).json('no user to add with provided userId')
        }

    }
    catch(err){}
}

//function for deleting friends and updating users by
//URL/api/users/friends/:[user you want to delete]
//send body with your userId 


async function deleteFriends(req,res){
    try{
        const oldFriend = await User.findById(req.params.userId)

        const user = await User.findById(req.body.userId)

        const friendRemoved = await User.findOneAndUpdate(
            {_id: user._id},
            {$pull:{friends: oldFriend._id}},
            { new: true }
        )


        if(friendRemoved){
            const removedBack = await User.findOneAndUpdate(
                {_id: oldFriend._id},
                {$pull: {friends: user._id}},
                {new: true}
            )
            
            res.status(200).json('you are no longer friends')
        }
        else{
            res.status(404).json('no user to remove with provided userId')
        }

    }
    catch(err){}
}


module.exports = {getUser, postUser, getByUser, updateUser, deleteByUser, addFriends, deleteFriends}