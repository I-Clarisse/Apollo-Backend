import { Comment } from '../models/comment.model.js';
import lodash from 'lodash';
const { pick } = lodash;

export const getComment = async(req, res) => {
    try{
        let comment = await (await Comment.findById(req.params.id)).select("-content -madeAt -post -commenter");
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
        let comment = new Comment(pick(req.body, ['content']));
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

export const updateComment = async(req, res) => {
    try{
        try {
        let commentInfo = await Comment.findById(req.params.id);
        if(!commentInfo) return res.status(400).send("The comment doesnot exist");
        let content = (req.body.content) ? req.body.content : commentInfo.content;

        let comment = await Comment.findByIdAndUpdate(req.params.id, {
            content: content
        }, { new: true });
        res.status(200).send({
            message: 'comment updated successfully!',
            data: comment
        })
    }
    catch(err) {
        res.status(400).send(err.message);
    }
    }
    catch(err) {
        res.status(500).send(err.message);
    }
}

export const deleteComment = async(req, res) => {
    try {
        let comment = await Comment.findById(req.params.id);
        if(!comment) return res.status(200).send("The commen doesnot exist!");

        await Comment.findByIdAndRemove(req.params.id);
        res.status(200).send("Comment deleted successfully!");
    }
    catch(err) {
        res.status(400).send(err.message);
    }
}