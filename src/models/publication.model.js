const {Schema,model} = require('mongoose');

const publicationSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    photo: {type: String},
    mimetype: {type: String},
    path: {type: String},
    size: {type: Number},
    user: {type: String}
},{
    timestamps: true
});

//export
module.exports = model('publication',publicationSchema);