import Joi from 'joi';
import _ from 'lodash';

export async function validateSongPosting(req, res, next) {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            artist: Joi.array().min(1).required(),
            image: Joi.string().required(),
            description: Joi.string().required(),
            lyrics: Joi.string().required(),
            genre: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);
        if(error) {
            return res.status(200).json({
                error: error.message,
                message: "Unable to post the the song!",
            })
        }
        return next();
    }
    catch(err) {
        res.status(400).send(err.message);
    }
}

export async function validateUpdateSong(req, res, next) {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            artist: Joi.array().min(1).required(),
            image: Joi.string().required(),
            description: Joi.string().required(),
            lyrics: Joi.string().required(),
            genre: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);
        if(error) {
            res.status(200).json({
                error: error.message,
                message: "Unable to update the song!",
            });
        } 
        return next();
    }
    catch(err) {
        res.status(400).send(err.message);
    }
}