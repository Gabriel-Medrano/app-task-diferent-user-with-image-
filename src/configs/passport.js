const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user.model');

passport.use('loginU',new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},async (email,password,done) => {
    const user = await User.findOne({email});
    if(!user) {
        return done(null,false,{message: 'The user not existed'});
    }else{
        const compare = await user.comparePassword(password);
        if(compare){
            return done(null,user);
        }else {
            return done(null,false,{message: 'The password this bad'});
        }
    }
}));

// serilalize
passport.serializeUser((user,done)=> {
    done(null,user.id);
});

passport.deserializeUser((id,done)=> {
    User.findById(id,(err,user)=> {
        done(err,user);
    });
})
