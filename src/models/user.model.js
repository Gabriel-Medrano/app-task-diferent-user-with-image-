const {Schema,model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String,required: true}
},{
    timestamps: true
});

//encrypt
userSchema.methods.encryptPassword = async pass => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass,salt);
}

//compare
userSchema.methods.comparePassword = async function (pswd) {
    return await bcrypt.compare(pswd,this.password);
}

//export
module.exports = model('user',userSchema);