
const userControl = {};

const User = require('../models/user.model');
const passport = require('passport');

userControl.viewFormSignup = (req,res) => {
    res.render('user/signup');
}

userControl.signup = async (req,res) => {
    const Msg = [];
    const {name,email,password,confirm_password} = req.body;
    if(password != confirm_password){
        Msg.push({text:'Password not coincided'});
    }
    if(password.length < 4){
        Msg.push({text:'Password min fourt Character'});
    }
    if(Msg.length > 0) {
        res.render('user/signup',{Msg,name,email,password,confirm_password});
    }else{
        const userEmail = await User.findOne({email});
        if(userEmail){
            req.flash('error_msg','The email this exited');
            res.redirect('/signup');
        }else{
            const newUser = await new User({name,email,password});
            newUser.password = await newUser.encryptPassword(password);
            newUser.save();
            req.flash('success_msg','The user is created');
            res.redirect('/signin');
        }
    }
}

userControl.viewFormSignin = (req,res) => {
    res.render('user/signin');
}

userControl.signin = passport.authenticate('loginU',{
    failureRedirect: '/signin',
    successRedirect: '/',
    failureFlash: true
});

userControl.logout = (req,res) => {
    req.logout();
    req.flash('success_msg','User logged successfully');
    res.redirect('/signin');
}

//export
module.exports = userControl;