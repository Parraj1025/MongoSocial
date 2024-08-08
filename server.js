const {MongoClient} = require('mongodb')

const express = require('express')
const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json())

app.get('/api/users', (req,res) => {
    res.json([
    {
        username: 'JuanchoBoomin'
    },
    {
        username: 'Luzmapa'
    }
    ])
    console.log('USER GET route working')
})

app.get('/api/posts', (req,res) => {
    res.json([
        {
            username: 'JuanchoBoomin',
            thoughts: 'this is working'
        },
        {
            username: 'Luzmapa',
            thoughts: 'good job'
        }
    ])

    console.log('POST POST route working')
})


app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT: ${PORT}`)
})
