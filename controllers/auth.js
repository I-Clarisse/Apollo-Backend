const express = require('express');
const routes = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { use } = require('bcrypt/promises');

routes.post('/userLogin', async (req, res) => {
    const {
        email, password,
    } = req.body

    if(!email || !password) return res.json('Email and password are required').status(400);
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.json({
        message: 'Invalid email or password',
    }).status(400)
    const matchPassword = await user.passwordMatch(password);
    if(!matchPassword) return json('Invalid email or password').status(400);
    let token = user.generateToken()
    return res.status(200).json({
        success: true,
        token
    })
});

module.exports = routes