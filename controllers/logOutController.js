const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


module.exports = logOut = async (req, res, next) => {
    res.cookie('tokenPatient', 'non', {
        httpOnly: true,
        expires: new DataCue(date.now()+10*1000)
    });
    res.status(200).json({
        success: true,
        message: "You have logged out successfully"
    })
}
