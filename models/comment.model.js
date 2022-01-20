import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;
import idValidator from 'mongoose-id-validator';

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    madeAt: {
        type: Date,
        default: Date.now(),
    },
    post: {
        type: SchemaTypes.ObjectId,
        ref: 'post',
        required: true,
    },
    commenter: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
    },

})

//idValidator is used to actually verify that the document we are referencing exists
commentSchema.plugin(idValidator);

const Comment = model('comment', commentSchema);

const _Comment = Comment;
export { _Comment as Comment }; 