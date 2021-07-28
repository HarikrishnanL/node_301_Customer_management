const bcrypt = require('bcrypt');
const saltRounds = 13;

exports.encryptPassword = async (password)=>{
    return await bcrypt.hash(password,saltRounds);
}

exports.comparePassword = async (password,encryptedPassword)=>{
    return await bcrypt.compare(password,encryptedPassword);
}