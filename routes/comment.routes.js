import express from 'express';
const router = express.Router();

import { getComments, createComment } from '../controllers/comment.controller.js';

import { validateCommentCreation } from '../validators/comment.validator.js';

router.get('/comment', getComments);

router.post('/comment', validateCommentCreation, createComment);