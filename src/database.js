const mongoose = require('mongoose');

const {DB_URI} = process.env;


mongoose.connect(DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(db => console.log('db is connected'))
.catch(err => console.log(err));