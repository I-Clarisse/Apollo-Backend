const express = require('express');
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
routes.put("/userUpdate/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.json("No record of the user found")
        await User.updateOne({_id: req.params.id}, {
            $set = req.body
        })
        .then((user) => {
            res.status(200).json({
                message: "The account was edited successfully",
                data: user.message
            })
        })
        .catch(err => res.status(400).json(err))
    }catch(err){
        return res.send(err);
    }
});

module.exports = routes