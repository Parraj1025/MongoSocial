const mongoose = require('mongoose');

//conneect to MongoDB with ENV variable
mongoose.connect(process.env.MONGOURI);

module.exports = mongoose.connection