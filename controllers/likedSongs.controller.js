import { LikedSongs } from "../models/likedSongs.model";
import lodash from 'lodash';
import { Song } from "../models/song.model";
const { pick } = lodash;

export const getLikedSongs = async(req, res) => {
    try {
        try {
            let likedSongs = await LikedSongs.find();
            return res.send({
                status: 200,
                message: ok,
                data: likedSongs,
            });
        }
        catch(err) {
            res.send(err.message).status(400);
        }
    }
    catch(err) {
        res.status(500).send(err.message);
    }
}

export const addToLikedSongs = async(req, res) => {
    try {
        let likedSong = new LikedSongs(pick(req.body, ['songId', 'likedBy']));
        likedSong.likedAt = new Date();

        try {
            await likedSong.save();
            return res.json({ message: "Song added to likedSongs!", status: 200});
        }
        catch(err) {
            res.status(400).send(err.message);
        }
    }
    catch(err) {
        res.status(500).send(err.message)
    }
}

export const removeFromLikedSongs = async(req, res) => {
    try {
        let song = await Song.findById(req.params.id);
        if(!song) return res.status(200).send("Song is not in your liked songs!");

        LikedSongs.findByIdAndRemove(req.params.id);
        return res.status(200).send("Song moved from liked songs!");
    }
    catch(err) {
        res.status(400).send(err.message);
    }
}