import mongoose from 'mongoose';
const { Schema, SchemaTypes, model } = mongoose;
import idValidator from 'mongoose-id-validator';

const likedSongsSchema = new Schema({
    songId: {
        type: SchemaTypes.ObjectId,
        ref: 'song',
    },
    likedBy: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
    },
    likedAt: {
        type: Date,
        default: Date.now(),
    }
});

likedSongsSchema.plugin(idValidator);

const LikedSongs = model('likedSongs', likedSongsSchema);

const _LikedSongs = LikedSongs;

export { _LikedSongs as LikedSongs };