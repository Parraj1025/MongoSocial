const { Schema , model }= require('mongoose');


const  userSchema  = new Schema({
    username: {type: String},
    password: {type: String},
    posts: [{type: Schema.Types.ObjectId, ref: 'posts'}],
    friends: [{type: Schema.Types.ObjectId, ref: 'users'}]
},
{
    toJSON:{
        virtuals: true,
    },
}
);

userSchema.virtual('postCount').get(function(){
    return this.posts.length;
})

userSchema.virtual('friendCount').get(function(){
    return this.friends.length
})




const User = model('user', userSchema);

module.exports = User