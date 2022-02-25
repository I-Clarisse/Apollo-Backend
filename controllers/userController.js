const express = require('express');
const { protect } = require('../middlewares/authorisation');
const User = require('../models/userModel');

const routes = express.Router();

//register new user information
routes.post("/userRegister", async (req, res) => {
    try{
        let duplicateEmail = await User.findOne({email:req.body.email});
        if(duplicateEmail) return res.json("User already registered").status(400);

        let duplicatePassword = await User.findOne({password: req.body.password})
        if(duplicatePassword) return res.json("Password already exists!").status(400);
        let user = await User.create(req.body);
        res.status(201).json({
            message: "The User has been registered successfully",
            data: user
        });
    }catch(err){
        return res.status(500).json({err})
    }
})

//update user's account information
routes.put("/userUpdate/:id",protect, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.json("No record of the user found")
        await User.updateOne({_id: req.params.id}, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            date_of_birth: req.body.date_of_birth,
            gender: req.body.gender,
            password: req.body.password
        })
        .then((user) => {
            res.status(200).json({
                message: "The account was edited successfully",
                data: user.body
            })
        })
        .catch(err => res.status(400).json(err))
    }catch(err){
        return res.send(err);
    }
});

//follow a person
routes.put('follow',protect, (req, res)=>{
    User.findByIdAndUpdate(req.body.followId, {
        $push: {followers:  req.User._id}
    }, {new: true}, (err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.User._id, {
            $push : {following: req.body.followId}
        },{new: true}).then(result=>{
            res.json(result);
        }).catch(err=>{
            return res.status(422).json({error: err})
        })
    })
})

//unfollow
routes.put('unfollow',protect, (req, res)=>{
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: {followers:  req.User._id}
    }, {new: true}, (err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.User._id, {
            $pull : {following: req.body.unfollowId}
        },{new: true}).then(result=>{
            res.json(result);
        }).catch(err=>{
            return res.status(422).json({error: err})
        })
    })
})

module.exports = routes