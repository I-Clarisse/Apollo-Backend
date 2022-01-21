import { Song } from '../models/song.model';
import lodash from 'lodash';
const { pick } = lodash;

export const getSongs = async(req, res) => {
    try {
        let song = await Song.findById(req.song._id);
        if(!song) return res.status(404).send("Song not found!");
        return res.send({
            status: 200,
            message: 'ok',
            data: song,
        });
    }
    catch(err) {
        res.status(500).send(err.message);
    }
}

export const createSong = async(req, res) => {
    try {
        let song = new Song(pick(req.body, ['name', 'artist', 'description', 'content', 'genre', 'image']));
        song.postedAt = new Date();
        try {
            await song.save();
            return res.json({message: "song posted successfully!", status: 200})
        }
        catch(err) {
            res.status(400).send(err.message);
        }
    }
    catch(err) {
        res.status(500).send(err.message);
    }
}