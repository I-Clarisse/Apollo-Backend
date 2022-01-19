const GoogleStrategy = require('passport-google-oauth20').Strategyl
const passport = require('passport');
const GoogleAccount = require('../models/userModel');

passport.use(
    new GoogleStrategy({
        clientID:"",
        clientSecret: "",
        callBackUrl: ""
    }, )
)