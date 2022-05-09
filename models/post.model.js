const mongoose = require('mongoose')
const Joi = require('joi')
// import { required } from 'joi';
// import idValidator from 'mongoose-id-validator';

const postSchema = new mongoose.Schema({
    postImage:{
        type: String,
        default: {},
        required: [true, 'Please add a photo']
    },
    caption: {
        type: String,
        required: [true, 'Please add a description']
    },
    location: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now()),
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
    ]
},
{
    toJSON: {
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
})

exports.postValidation = (post) =>{
    const schema = Joi.object({
        postImage: Joi.string(),
        caption: Joi.string(),
        location: Joi.string(),
        postedBy: Joi.string()
    })
    return schema.validate(post)
}

//creating and populating virtual property 'comments' in postSchema
//
postSchema.virtual('comments',{
    ref: 'comments',// comment is table
    // localField: '_id', //of post collection
    // foreignField: 'post', //of comment collection
    localField: 'comments',
    foreignField: '_id',
    justOne: false 
})

postSchema.virtual('users',{
    ref: 'users',
    localField: 'postedBy',
    foreignField: '_id',
    justOne: true
})

exports.validatePostEdit = (post) => {
    const postEditSchema = Joi.object({
        postImage: Joi.string(),
        
    })
}

const Post = mongoose.model('posts', postSchema);
exports.Post = Post;