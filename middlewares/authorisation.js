const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return res.status(400).json({
            message: 'Not authorized to access this route'
        })
    }
    try {
        const decoded = jwt.derify(token, process.env.JWT_SECRET_KEY)
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports.protect = protect;