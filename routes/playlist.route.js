const express = require('express')
const router = express.Router();

const {createPlaylist,getAllPlaylists, welcome} = require("../controllers/playlist.controller")

router.get('/', welcome)
router.post('/playlist/new', createPlaylist)
router.get('/allPlaylists',getAllPlaylists)

module.exports = router