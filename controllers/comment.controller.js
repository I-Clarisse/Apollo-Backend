import { Comment } from '../models/comment.model.js';
import lodash from 'lodash';
const { pick } = lodash;

export const getComments = async(req, res) => {
    try{
        let comment = await (await Comment.findById(req.comment._id)).select("-content -madeAt -post -commenter");
        if(!comment) return res.status(400).send("Comment not found!");
        return res.send({
            status: 200,
            message: ok,
            data: comment
        })
    }
    catch(err) {
        res.status(400).send(err.message);
    }
}

export const createComment = async(req, res) => {
    try {
        let comment = new Comment(pick(req.body, ['content', 'post', 'commenter']));
        const time = new Date();
        comment.madeAt = time;
        try {
            await comment.save();
            return res.json({message: "comment posted!", status: 200});
        }
        catch(err) {
            res.status(400).send(err.message);
        }
    }
    catch(err) {
        res.status(500).send(err.message);
    }
}