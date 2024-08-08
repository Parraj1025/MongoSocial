
require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json())


const {MongoClient} = require('mongodb')

const uri = process.env.MONGOURI;
let client,db; 

app.get('/api/users', async  (req,res) => {
   const users = await db.collection('Users').find({},{projection:{_id:0}}).toArray()

    res.json(users)
    console.log('USER GET route working')
})

app.post('/api/users', async (req,res) => {
    const user = req.body.username
    const password = req.body.password

    const result = await db.collection('Users').insertOne({username:user, password:password})

    res.json(result)
})

app.put('/api/users', async (req,res) =>{
    const user = req.body.olduser;
    const newuser = req.body.newuser;
    const result = await db.collection('Users').updateOne({"username": `${user}`}, {$set: {"username": newuser}})
    res.json(result)
})


 

app.get('/api/posts', async (req,res) => {
    const posts = await db.collection('Posts').find({}).toArray()
    res.json(posts)

    console.log('POST POST route working')
})




//initiation function
async function init() {
    try{
        client = new MongoClient(uri);
        await client.connect();
        db = client.db('MongoSocial');
        console.log('connected to DB')
    }
    catch(err){
        console.log(err)
    }
}

init().then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER LISTENING ON PORT: ${PORT}`)

    })
}).catch(console.log)
// app.listen(PORT, () => {
//     console.log(`SERVER RUNNING ON PORT: ${PORT}`)
// })
