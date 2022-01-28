const mongoose = require('mongoose')
const Joi = require('joi')
import { required } from 'joi';
import idValidator from 'mongoose-id-validator';

const postSchema = new mongoose.Schema({
    photo:{
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
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(Date.now()),
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'user'
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
        postImage: Joi.string().require(),
        caption: Joi.string(),
        userId: Joi.string(),
        location: Joi.string()
    })
    return schema.validate(post)
}

postSchema.virtual('comments',{
    ref: 'comment',// comment is table
    localField: '_id',
    foreignField: 'post',
    justOne: false
})

const Post = mongoose.model('posts', postSchema);
exports.Post = Post;