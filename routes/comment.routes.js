import express from 'express';
const router = express.Router();

import { getComment, createComment, updateComment, deleteComment } from '../controllers/comment.controller.js';

import { validateCommentCreation, validateUpdateComment } from '../validators/comment.validator.js';

router.get('/comment/:id', getComment);

router.post('/comment/post', validateCommentCreation, createComment);

router.put('/comment/update/:id', validateUpdateComment, updateComment);

router.delete('/comment/delete/:id', deleteComment);

export default router;