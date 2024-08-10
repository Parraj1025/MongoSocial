const { Schema , model }= require('mongoose');


const  userSchema  = new Schema({
    username: {type: String},
    password: {type: String},
    posts: [{type: Schema.Types.ObjectId, ref: 'posts'}]
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



const User = model('user', userSchema);

module.exports = User