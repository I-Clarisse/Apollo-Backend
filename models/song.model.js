import mongoose, { SchemaTypes } from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;
import idValidator from 'mongoose-id-validator';

const songSchema = new Schema({
    name: {
        type: String,
        min: 3,
        required: true,
    },
    artist: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        minLength: 3,
        maxLength: 30,
        required: true,
    },
    content: {
        type: String,
        
        required: true,
    },
    genre: {
        type: String,
        required: true,
    }
})

songSchema.plugin(idValidator);

const Song = model('model', songSchema);

const _Song = Song;

export { _Song as Song };
