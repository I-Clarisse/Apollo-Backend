const mongoose = require('mongoose')
const { Schema, SchemaTypes, model } = mongoose;
const idValidator = require('mongoose-id-validator')

const songSchema = new Schema({
    name: {
        type: String,
        min: 3,
        required: true,
    },
    artist: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        minLength: 1,
        required: true,
    },
    // image: {
    //     type: String,
    //     required: true,
    // },
    description: {
        type: String,
        required: true,
    },
    lyrics: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    postedAt: {
        type: Date,
        default: Date.now()
    }
})

songSchema.plugin(idValidator);

// const Song = model('song', songSchema);
const Song = mongoose.model('song', songSchema);
exports.Song = Song;

// const _Song = Song;
    
// export { _Song as Song };