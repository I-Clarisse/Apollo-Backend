const {Playlist, playlistValidation} = require('../models/playlist.model')
const { formatResult } = require('../utils/formatter')

exports.welcome = async(req, res)=>{
    try {
        res.status(200).send("Hello World Welcome to Apollo")
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.createPlaylist = async(req, res) =>{
    try {
        const {error} = playlistValidation(req.body)
        if(error) return res.status(400).send(error.details)

        let newPlaylist = await Playlist.findOne({playlistName:req.body.playlistName})
        if(newPlaylist) res.status("400").send("Playlist already exists");

        newPlaylist = new Playlist(_.pick(req.body,[playlistName]))
        // newPlaylist = new Playlist({playlistName: req.body.playlistName})
        try{
            await newPlaylist.save()
            res.send(formatResult({
                status: 201,
                message: "post created successfully",
                data: newPlaylist
            }))
        }catch (ex) {
            res.status(400).send(ex.details)   
        }
    }
    catch(err){
        res.status(500).send(err.details)
    }
}

exports.addSongs = async(req, res) =>{
    try{

    }catch(error){
        res.status(400).send(error)
    }
}

exports.getUserPlaylist = async(req, res) =>{
    try{
         const playlistFound = await Playlist.findById(req.params.id)
         if(!playlistFound){
             return res.send(formatResult({
                 status: 404,
                 message: "playlist not found!"
             }))
         }
         return res.send(formatResult({
             status: 200,
             message: "ok",
             data: playlistFound
         }))
    }catch(error){
        res.status(400).send(error.message)
    }
}


exports.getAllPlaylists = async(req, res) =>{
    try {
        const playlists = await Playlist.find()
        return res.send(formatResult({
            status: 200,
            message: "ok",
            data: playlists
        }))
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.deletePlaylist = async (req, res) =>{
    try {
        const {error} = playlistValidation(req.body)
        if (error) res.send(formatResult({
            status: 400,
            message: error.details[0].message
        }))
        Playlist.findByIdAndRemove(req.params.id)
    } catch (error) {
        res.status(400).send(error.message)
    }
}