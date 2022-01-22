const mongoose = require('mongoose');
const Joi = require('joi')
const playlistSchema = new mongoose.Schema(
    {
    playlistName:{
        type: String,
        maxlength: 250,
        default: 'playlist1'
    },
    playlistSongs:{
        type: Array,
        default: []
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

exports.playlistValidation = (playlist) => {
    const schema = {
        playlistName: Joi.string()
    }
    return schema.validate(playlist, schema)
}

const Playlist = mongoose.model('playlists',playlistSchema)
exports.Playlist = Playlist
