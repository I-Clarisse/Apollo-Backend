const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const config = require('config');
const { ONE_DAY } = require('../utils/imports');
const { ObjectId } = mongoose.Schema.Types;

//creating the user schema
let userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type:String
    },
    phone:{
       type :String
    },
    date_of_birth: {
        type:String
    },
    gender: {
        type:String
    },
    password: {
        type:String
    },
},{
    timestamps: true
});

//hash the password
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//check if the passwords match
userSchema.methods.passwordMatch = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//generate the token
userSchema.methods.generateToken = function(){
    return JWT.sign({
        id: this._id,
        isAdmin: this.isAdmin
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: ONE_DAY
    })
}

const token = user.generateAuthToken();
const options = {
    expires: new date (date.now() + ONE_DAY),
    httpOnly: true
}
res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token: token
});