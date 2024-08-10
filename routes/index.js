const express = require('express');
const router = express.Router();

const userRoutes = require('./api/UserRoutes.js');
const postRoutes = require('./api/PostRoutes.js');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router