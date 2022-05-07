const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../public/uploads');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(new Error('message'),false)
    }
}

const upload = multer(
    {
        storage: storage,
        limits:{
            fileSize: 1024*1024*5
        },
        fileFilter: fileFilter
    })


const {createPost, getAllPosts, getPost, addPost, updatePost, deletePost, likePost, unlikePost} = require("../controllers/post.controller")

// router.use('/:postId/comments', commentRoutes)
router.get('/post/all', getAllPosts)

router.post('/post/new',upload.single('postImage') ,createPost)

router.get('/post/:id', getPost)

router.put('/post/edit/:id', updatePost)

router.delete('/post/delete/:id', deletePost)

router.route('/:id/likes').put(likePost)

router.route('/:id/unlike').put(unlikePost)

module.exports = router