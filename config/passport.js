const GoogleStrategy = require('passport-google-oauth20').Strategyl
const passport = require('passport');
const GoogleAccount = require('../models/userModel');

passport.use(
    new GoogleStrategy({
        clientID:"",
        clientSecret: "",
        callbackUrl: ""
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
modoule.exports.Passport = passport