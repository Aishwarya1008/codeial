const express = require('express');
const port = 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const app = express();

app.use(sassMiddleware({
    src: './assests/scss',
    dest: './assests/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.static('./assests'));
app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use(cookieParser());

app.use(express.urlencoded());

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    name: 'codeial',
    secret:'somethingBlah',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }, 
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disable'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log('Error in listening', err);
        return;
    }
    console.log('Success');
});