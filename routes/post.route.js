const express = require('express')
const router = express.Router()

const {getAllPosts, getPost, addPost, updatePost, deletePost, likePost, unlikePost} = require("../controllers/post.controller")

// router.use('/:postId/comments', commentRoutes)
router.get('/post/all', getAllPosts)

router.post('/post/new', addPost)

router.get('/post/:id', getPost)

router.put('/post/edit/:id', updatePost)

router.delete('/post/delete/:id', deletePost)

router.route('/:id/likes').put(likePost)

router.route('/:id/unlike').put(unlikePost)

module.exports = router