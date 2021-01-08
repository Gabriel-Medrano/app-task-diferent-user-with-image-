require('dotenv').config();

const app = require('./serve');

//Starting DB
require('./database');
//Starting Passport
require('./configs/passport');
//Starting serve
app.listen(app.get('port'),()=> {
    console.log('serve on port:', app.get('port'));
});