const { ensureAuth, ensureGuest } = require('../middlewares/auth');
const router = require('express').Router();

router.get('/', ensureGuest, async(req, res) => {
    res.render('../views/login.ejs');
});
router.get('/success', ensureAuth, async(req, res) => {
    res.send('../views/index.ejs', {userinfo: req.newUser});
});
module.exports = router