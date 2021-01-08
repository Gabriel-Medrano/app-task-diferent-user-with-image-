const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Essession = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

//Initialization
const app = express();

//Setting
app.set('port',process.env.PORT || 3500);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set('view engine','.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(Essession({
    secret: process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Global Variables
app.use((req,res,next)=>{
    res.locals.Msg_success = req.flash('success_msg');
    res.locals.Msg_error = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;

    next();
});

//Routes
app.use(require('./routes/public.route'));
app.use(require('./routes/user.route'));
app.use(require('./routes/publication.route'));

//Static files
app.use(express.static(path.join(__dirname,'public')));

//esports
module.exports = app;

