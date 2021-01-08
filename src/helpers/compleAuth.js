
const helperAuth = {};

helperAuth.isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg','Not authorized');
    res.redirect('/signin');
}

//export 
module.exports = helperAuth;