const multer = require('multer');
const path = require('path');
const {v4: uuidv4} = require('uuid');

const compleImg = {};

//storage
const storageImg = multer.diskStorage({
    destination: path.join(__dirname,'../public/img/uploads'),
    filename: (req,file,cb) => {
        cb(null,uuidv4() + path.extname(file.originalname).toLowerCase());
    }
});

//filter
const filterImg = (req,file,cb) => {
    const typeFile = /png|jpeg|jpg|gif/;
    const mimeType = typeFile.test(file.mimetype);
    const extName = typeFile.test(path.extname(file.originalname));
    if(mimeType && extName) {
        cb(null,true);
    }
}

compleImg.helperImg = multer({
    storage: storageImg,
    limits: {fileSize: 1000000},
    fileFilter: filterImg
}).single('photo');

//export
module.exports = compleImg;