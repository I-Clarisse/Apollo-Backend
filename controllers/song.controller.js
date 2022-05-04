const {Song} = require('.../models/song.model')
const lodash = require('lodash')
const { pick } = lodash;


export const getSong = async(req, res) => {
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

export const postSong = async(req, res) => {
    try {
        let song = new Song(pick(req.body, ['name', 'artist', 'description', 'lyrics', 'genre', 'image']));
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

export const updateSong = async(req, res) => {
    try {
        try {
            let songInfo = await Song.findById(req.params.id).select("-name -artist -image -description -lyrics -genre");
            if(!songInfo) return res.status(400).send("Song not Found!");
            
            let name = (req.body.name) ? req.body.name : songInfo.name;
            let artist = (req.body.artist) ? req.body.artist : songInfo.artist;
            let image = (req.body.image) ? req.body.image : songInfo.image;
            let description = (req.body.description) ?  req.body.description : songInfo.description;
            let lyrics = (req.body.lyrics) ? req.body.lyrics : songInfo.lyrics;
            let genre = (req.body.genre) ?  req.body.genre : songInfo.genre;

            let song = await Song.findByIdAndUpdate(req.params.id, {
                name: name,
                artist: artist,
                image: image,
                description: description,
                lyrics: lyrics,
                genre: genre,
            }, { new: true });
            res.status(200).send({
                message: 'Song updated successfully!',
                data: song,
            })
        }
        catch(err) {
            res.status(400).send(err.message);
        }
    }
    catch(err) {
        res.status(500).send(err.message);
    }
}

export const deleteSong = async(req, res) => {
    try {
        try {
            let song = await Song.findById(req.params.id);
            if(!song) return res.status(200).send("The song doesnot exist!");

            await Song.findByIdAndRemove(req.params.id);
            res.status(200).send("Song deleted successfully!");
        }
        catch(err) {
            res.status(400).send(err.message)
        }
    }
    catch(err) {
        res.status(500).send(err.message);
    }
}