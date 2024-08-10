const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "user"} ,
    post: {type: String}
})

const Post = model('posts', postSchema)

module.exports = Post, postSchema