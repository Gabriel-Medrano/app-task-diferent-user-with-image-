
const publicControl = {};

publicControl.viewAbout = (req,res) => {
    res.render('about');
}

publicControl.viewContact = (req,res) => {
    res.render('contact');
}

publicControl.viewPolity = (req,res) => {
    res.render('polity');
}

//export
module.exports = publicControl;