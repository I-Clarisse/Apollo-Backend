module.exports = function (req, res, next){
    if(!req.patient.isAdmin) return res.status(403).send('Access Denied');
}