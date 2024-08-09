require('dotenv').config();
const express = require('express');
const db = require('./config/connection');


//Routes
const routes = require('./routes/index')

const PORT = process.env.PORT || 3000;
const app = express();
app.use('/api', routes)

app.use(express.json())


db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`APP LISTENING ON PORT ${PORT}`)
    })
})