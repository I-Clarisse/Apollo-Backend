const express = require('express')
const router = express.Router()

const {getAllPosts, getPost, addPost, updatePost, deletePost, likePost, unlikePost} = require("../controllers/post.controller")

// router.use('/:postId/comments', commentRoutes)
router.route('/post/')
    .get(getAllPosts)
    .post(addPost);

router.route('/post/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost)

router.route('/:id/likes').put(likePost)
router.route('/:id/unlike').put(unlikePost)

module.exports = router