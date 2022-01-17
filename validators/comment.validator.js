import Joi from 'joi';
import { Comment } from '../models/comment.model.js';
import _ from 'lodash';

export async function validateCommentCreation(req, res, next) {
    try {
        const schema = Joi.object({
            content: Joi.string().required(),
            post: Joi.string().required(),
            commenter: Joi.string().required(),
        })
        const { error } = schema.validate(req.body);
        if(error) {
            return res.status(200).json({
                error: error.message,
                message: "Unable to post comment",
            });
        }
        return next();
    }
    catch(err) {
        res.status(400).send(err.message);
    }
}