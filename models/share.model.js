import mongoose from 'mongoose';
const { Schema, SchemaTypes, model} = mongoose;
import idValidator from 'mongoose-id-validator';

const shareSchema = new Schema({
    link: {
        type: String,
        required: true,
    },
    from: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
    },
    to: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
    },
    sharedAt: {
        type: Date,
        default: Date.now(),
    }
})

shareSchema.plugin(idValidator);

const Share = model('share', shareSchema);

const _Share = Share;

export { _Share as Share };