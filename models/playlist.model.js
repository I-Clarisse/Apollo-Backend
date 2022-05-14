const mongoose = require("mongoose");
const Joi = require("joi");
// import idValidator from 'mongoose-id-validator';
// const idValidator = require('idValidator')

/**
 * @swagger
 * componets: 
 * schemas:
 * Playlist:
 * type: object,
 * required:
 * playlistName
 * properties:
 * id: 
 * type: string
 * description: The auto-generated id of a playlist
 * playlistName:
 * type: string
 * description: The name of the playlist
 */

const playlistSchema = new mongoose.Schema({
  playlistName: {
    type: String,
    maxlength: 250,
    required: true
    // default: "playlist1",
  },
  playlistSongs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: [true, "Please add the correct song id"],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
Joi.string();
exports.playlistValidation = (playlist) => {
  const schema = Joi.object({
    playlistName: Joi.string(),
  });
  return schema.validate(playlist);
};
//idValidator to validate if the document we are referencing exists
// playlistSchema.plugin(idValidator);

exports.validatePlaylistEdit = (playlist) => {
  const schema = Joi.object({
    playlistName: Joi.string().min(2),
    playlistSongs: Joi.array(),
  });
  return schema.validate(playlist);
};
const Playlist = mongoose.model("playlists", playlistSchema);
exports.Playlist = Playlist;
