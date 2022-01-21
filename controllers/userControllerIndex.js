const router = require('express').Router();

router.get('/', async(req, res) => {
    res.render('../views/login.ejs');
});
router.get('/success', async(req, res) => {
    res.send('../views/index.ejs', {userinfo: req.user});
});
module.exports = router