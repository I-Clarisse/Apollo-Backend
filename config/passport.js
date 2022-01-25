const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const GoogleAccount = require('../models/userModel');
const OAuth2Data = require('../client_secret_884821326007-u8viojarb5138bq8a1hd50je7msl62lh.apps.googleusercontent.com.json')

passport.use(
    new GoogleStrategy({
        clientID: "OAuth2Data.client.id",
        clientSecret: "OAuth2Data.client.secret",
        callbackUrl: "OAuth2Data.client.redirect"
    }, 
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        //get the user data from Google
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.firstName,
            lastName: profile.lastName,
            image: profile.photos[0].value,
            email: profile.emails[0].value
        }
        console.log(newUser);
        try{
            //finding the user in the database
            let user = await GoogleAccount.findOne({googleId: profile.id});
            if(user){
                //if present in the database
                done(null, user);
            }else {
                user = await GoogleAccount.create(newUser);
                done(null, user);
            }
        }catch(error){
            console.log(error)
        }
    }
));
//used to serialize the user from the session
passport.serializeUser((user, done) => {
    done(null, user.id)
});
//deserialize the user
passport.deserializeUser((id, done) => {
    GoogleAccount.findById(id, (err, user) => done(err, user));
});

module.exports.Passport = passport