import Joi from 'joi';
import _ from 'lodash';

export async function validateShare(req, res, next) {
    try {
        const schema = Joi.object({
            link: Joi.string().required(),
            from: Joi.string().required(),
            to: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);
        if( error ) {
            return res.status(200).json({
                error: error.message,
                message: "Unable to share!",
            });
        }
        return next();
    }
    catch(err) {
        res.status(400).send(err.message);
    }
}

export async function validateUpdateShared(req, res, next) {
    try {
        const schema = Joi.object({
            link: Joi.string().required(),
            from: Joi.string().required(),
            to: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);
        if( error ) {
            return res.status(200).json({
                error: error.message,
                message: "Unable to update the shared content!",
            });
        }
        return next();
    }
    catch(err) {
        res.status(400).send(err.message);
    }
}
