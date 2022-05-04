const express = require('express')
const router = express.Router();

const {createPlaylist, getAllPlaylists, getUserPlaylist, deletePlaylist, addSongs, editPlaylist} = require("../controllers/playlist.controller")

router.post('/playlist/new', createPlaylist)

router.get('/playlist/all', getAllPlaylists)

router.get('/playlist/:id', getUserPlaylist)

router.put('/playlist/edit/:id', editPlaylist)

router.delete('/playlist/delete/:id', deletePlaylist)

router.put('/playlist/addSongs/:playlistId/:songId', addSongs)

module.exports = router