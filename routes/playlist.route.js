const express = require('express')
const router = express.Router();

const {createPlaylist, getAllPlaylists, getUserPlaylist, deletePlaylist, addSongs, editPlaylist} = require("../controllers/playlist.controller")

/**
 * @swagger
 *  /playlist/new:
 *    post:
 *      tags: [PLAYLIST OPERATIONS]
 *      description: Get a playlist
 *      summary: Get user's playlist
 *      parameters:
 *         - playlistName
 *           type: string
 *      responses:
 *       200: 
 *         description: success
 *       401:
 *         description: unauthorized
 *       404:
 *         description: not found
 *       500:
 *          description: Server Error
 * 
 */

router.post('/playlist/new', createPlaylist)

/**
 * @swagger
 *  /playlist/:id:
 *    get:
 *      tags: [PLAYLIST OPERATIONS]
 *      description: Get a playlist
 *      summary: Get user's playlist
 *      parameters:
 *         - playlistName
 *           type: string
 *      responses:
 *       200: 
 *         description: success
 *       401:
 *         description: unauthorized
 *       404:
 *         description: not found
 *       500:
 *          description: Server Error
 * 
 */

router.get('/playlist/all', getAllPlaylists)

router.get('/playlist/:id', getUserPlaylist)

router.put('/playlist/edit/:id', editPlaylist)

router.delete('/playlist/delete/:id', deletePlaylist)

router.put('/playlist/addSongs/:playlistId/:songId', addSongs)

module.exports = router