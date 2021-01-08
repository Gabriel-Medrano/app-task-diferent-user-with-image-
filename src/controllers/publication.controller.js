const path = require('path');
const {unlink} = require('fs-extra');

const publicationControl = {};

const Publication = require('../models/publication.model');

publicationControl.viewsAllPublications = async (req,res) => {
    if(req.user){
        const publications = await Publication.find({user: req.user.id}).sort({createdAt: 'desc'}); 
        res.render('publication/all-publications',{publications});
    }else {
        res.render('index');
    }
}

publicationControl.viewFormNewPublication = (req,res) => {
    res.render('publication/new-publication');
}

publicationControl.createPublication = async (req,res) => {
    const publication = new Publication({
        title: req.body.title,
        description: req.body.description,
    });

    if(req.file) {
        publication.photo = req.file.filename;
        publication.mimetype = req.file.mimetype,
        publication.path = '/img/uploads/' + req.file.filename,
        publication.size = req.file.size
    }
  
    publication.user = req.user.id;
    await publication.save();
    req.flash('success_msg','The publication created Successfully');
    res.redirect('/');
}

publicationControl.viewPublication = async (req,res) => {
    const {id} = req.params;
    const publication = await Publication.findById(id);
    if(publication.user != req.user.id) {
        req.flash('error_msg','Not authorized');
        res.redirect('/');
    }  
    res.render('publication/publication',{publication});
}

publicationControl.viewFormEditPublication = async (req,res) => {
    const {id} = req.params;
    const publication = await Publication.findById(id);
    if(publication.user != req.user.id){
        req.flash('error_msg','Not authorized');
        res.redirect('/');
    }
    res.render('publication/edit-publication',{publication});
}

publicationControl.updatePublication = async (req,res) => {
    const {id} = req.params;
    const publication = {
        title: req.body.title,
        description: req.body.description
    }
    await Publication.findByIdAndUpdate(id,{$set: publication},{new: true});
    req.flash('success_msg','Date updated successfully');
    res.redirect('/');
}

publicationControl.removePublication = async (req,res) => {
    const {id} = req.params;
    const publicationv = await Publication.findById(id);
    if(publicationv.user != req.user.id){
        req.flash('error_msg','Not authorized');
        res.redirect('/');
    }else{
    const publication = await Publication.findByIdAndRemove(id);
    unlink(path.resolve('./src/public' + publication.path));
    req.flash('success_msg','The publication this removed successfully');
    res.redirect('/');
    }
}

//exports
module.exports = publicationControl;