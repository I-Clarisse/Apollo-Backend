const express = require('express')
const app = express()
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const debug = require('debug')
const startupdebug = debug('app:startup')
const dbDebug = debug('app:db')
const dbErrors = debug('app:errors')
const error = debug('error')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session');
const MongoStore = require('connect-mongo');
dotenv.config()
//calling the bodyParsing middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
// app.use(express.static())
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://Apollo:apollo123@apollo.2ectx.mongodb.net/Apollo"
        })
    })
)
//calling the routes
// app.use(require("./routes/"))
app.use(require('./controllers/userController'));
app.use(require('./controllers/logOutController'));
app.use(require('./controllers/auth'));
app.use(require('./controllers/userLoginGoogle'));
app.use(require('./controllers/userControllerIndex'));
// app.get('/', (req, res) =>{
//     res.send('Hello World!')
// })
app.use(express.static('public'))
app.set('view engine', 'ejs');
//connecting to the database
let password = config.get("DATABASE_PASSWORD")
mongoose.connect(`mongodb+srv://Apollo:apollo123@apollo.2ectx.mongodb.net/Apollo`)
.then(() =>{
    dbDebug("Connected to the database successfully...")
})
.catch(err => {
    dbErrors("Failed to connect due to ",err)
})

app.use(passport.initialize());
app.use(passport.session());

//Listening on port and checking if PORT environment variable is set
if(!config.get("PORT")){
    error("FATAL ERROR: Connection to port is not defined")
    process.exit(-1);
}
const port = 5000
app.listen(port, ()=>{
    startupdebug(`Listening on port ${port}`)
} )