const {formatResult} = require("../utils/formatter")
const {Post, postValidation} = require("../models/post.model")
const _ = require("lodash")


// exports.createPost = async(req,res) =>{
//     try {
//         const {error} = postValidation(req.body)
//         if(error) return res.status(400).send(error.message)

//         // if(req.file == {} || req.file == null){
//         //     return res.status(400).send("A post must have an image")
//         // }

//         let newPost = new Post(_.pick(req.body, ['photo', 'caption', 'location', 'postedBy']))
//         console.log(newPost)
//         newPost.photo = ((newPost.photo).replace("\\","/")).replace(" ","%20")

//         try {
//             await newPost.save()
//             res.send(formatResult({
//                 status: 201,
//                 message: "Post created",
//                 data: newPost
//             }))
//         } catch (ex) {
//             return res.send(formatResult({
//                 status: 400,
//                 message: ex.message
//             }))
//         }
//     } catch (error) {
//         return res.send(formatResult({
//             status: 400,
//             message: error.message
//         }))
//     }
// }

exports.createPost = async(req, res) =>{
    console.log(req.file)
    try {
        const {error} = postValidation(req.body)
        if(error) return res.status(400).send(error.details)

        let newPost = new Post(_.pick(req.body,['postImage', 'caption', 'location', 'postedBy']))
        console.log(newPost)
        try{
            await newPost.save()
            res.send(formatResult({
                status: 201,
                message: "Playlist created successfully",
                data: newPost
            }))
        }catch (ex) {
            return res.status(400).send(ex.details)   
        }
        
}
    catch(err){
        console.log(err)
        return res.status(500).send(err.details)
    }
}



exports.getAllPosts = async(req, res) =>{
    const posts = await Post.find({})
    .populate('postedBy')
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
            model: 'User',
        }
    })
    res.status(200).json({
        success: true,
        count: posts.length,
        data: posts
    })
}

exports.getPost = async(req, res) => {
    const post = await Post.findById(req.params.id).pop;
    if(!post) {
        res.status(404);
        throw new Error('Post not Found')
    }
    res.status(201).json({success: true, data: post})
}

exports.addPost = async(req,res) => {
    req.body.user = req.user.id;
    let post = await Post.create(req.body);

    if(req.files) {
        if(!req.files.photo.mimetype.startsWith('image/')) {
            res.status (401);
            throw new Error('Please add image file');
        }

        if(req.files.photo.size > process.env.FILE_UPLOAD_LIMIT) {
            res.status(401)
            throw new Error(`Please add a photo less than ${process.env.FILE_UPLOAD_LIMIT}`);
        }

        const photoFile = req.files.photo;

        photoFile.mv(`${process.env.FILE_UPLOAD_PATH}/${photoFile.name}`, async(err)=>{
            if(err) {
                res.status(401);
                throw new Error(err.message)
            }

            post = await Post.findByIdAndUpdate(
                post._id,
                {photo: photoFile.name},
                {
                    new: true,
                    runValidators: true
                }
            );
            res.status(201).json({
                success:true,
                data: post
            })
        })
    }
}

exports.updatePost = async(req, res) =>{
    let post = await Post.findById(req.params.id);

    if(!post){
        res.send(formatResult({
            status:404,
            message: "Post not found"
        }))
    }

    if(req.user.id.toString()!== post.user.toString() && req.user.role !== 'admin') {
        res.send(formatResult({
            status:404,
            message: "Not Authorized to update this post"
        }))
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(201).json({
        success: true,
        data: post
    })
}

exports.deletePost = async(req, res) =>{
    let post = await Post.findById(req.params.id);

    if(!post) {
        res.send(formatResult({
            status: 404,
            message: "Post not found"
        }))
    }

    if(req.user.id.toString() !== post.user.toString() && req.user.role !== 'admin'){
        res.send(formatResult({
            status: 404,
            message: "Not Authorized to delete this post"
        }))
    }

    post = await Post.findByIdAndDelete(req.params.id)

    res.status(201).json({
        success: true,
        data: {}
    })
}

exports.likePost = async(req, res) =>{
    let post  = await Post.findById(req.params.id)

    if(!post){
        res.send(formatResult({
            status:404,
            message: "Post Not Found"
        }))
    }

    if(post.likes.includes(req.user.id)){
        res.send(formatResult({
            status: 401,
            message: "Already likes post"
        }))
    }

    post = await Post.findByIdAndUpdate(
        req.params.id,
        {
            $push:{
                likes: req.user.id
            }
        },
        {
            new: true,
            runValidators: true
        }
    )
    res.status(201).json({
        success: true,
        data: post
    })
}

exports.unlikePost = async(req, res) =>{
    let post = await Post.findById(req.params.id);

    if(!post){
        res.send(formatResult({
            status:404,
            message: "Post not found"
        }))
    }

    post = await Post.findByIdAndUpdate(
        req.params.id,
        {
            $pull:{
                likes: req.user.id
            }
        },
        {
            new: true,
            runValidators: true
        }
    )
    res.status(201).json({
        success: true,
        data: post
    })
}
