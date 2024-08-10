const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "user"} ,
    post: {type: String},
    createdAt: {type: Date, default: Date.now},
    meta:{
        upvotes:{ type: Number, default: 0}
    }
})

const Post = model('posts', postSchema)

module.exports = Post, postSchema