const express = require('express')
const router = express.Router();

const {createPlaylist, getAllPlaylists, getUserPlaylist, deletePlaylist, addSongs, welcome, editPlaylist} = require("../controllers/playlist.controller")

router.get('/', welcome)

router.post('/playlist/new', createPlaylist)

router.get('/playlist/all', getAllPlaylists)

router.get('/playlist/:id', getUserPlaylist)

router.put('/playlist/edit/:id', editPlaylist)

router.put('/playlist/addSongs', addSongs)

router.delete('/playlist/delete/:id', deletePlaylist)
module.exports = router