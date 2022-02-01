const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const token = User.generateAuthToken();
    const options = {
    expires: new date (date.now() + ONE_DAY),
    httpOnly: true
    }
    res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token: token
    }); 

const protect = async (req, res, next) => {

    if(req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer')) {
        token = req.headers['authorization'].split(' ')[1];
    }
    if(!token){
        return res.status(400).json({
            message: 'Not authorized to access this route'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports.protect = protect;