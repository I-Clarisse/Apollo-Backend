import express from 'express';
const router = express.Router();

import { validateSongPosting, validateUpdateSong } from '../validators/song.validator.js';
import { getSong, postSong, updateSong, deleteSong } from '../controllers/song.controller.js';

router.get('/song/:id', getSong);

router.post('/song/post', validateSongPosting, postSong);

router.put('/song/update/:id', validateUpdateSong, updateSong);

router.delete('/song/delete/:id', deleteSong);

export default router;