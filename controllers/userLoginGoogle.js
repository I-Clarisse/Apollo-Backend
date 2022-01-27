const express = require('express');
const { Passport } = require('../config/passport');
const passport = require('passport');

const app = express();

app.get('/', async (req, res) => {
    res.render("../views/login.ejs");
});
app.get('/success', async (req, res) => {
    res.render("../views/index.ejs", {userinfo:req.newUser});
});

app.get('/auth/google', Passport.authenticate('google', {scope: ['profile', 'email']}))

app.get('/auth/google/callback', Passport.authenticate('google', {
    failureRedirect: '/'
}), async (req, res) => {
    res.redirect('/success')
});
app.get('/logout', async (req, res) => {
    req.session.destroy(function(e){
        req.logout();
        res.redirect('/');
    });
});
module.exports = app