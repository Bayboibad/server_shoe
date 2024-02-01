const db = require('../database/db');
const userShema =new db.mongoose.Schema({
    username: String,
    password: String,
    email:String,
    fullname: String,
},{collection:"tb_user", timestamps: true });
let Users = db.mongoose.model('users',userShema);
module.exports = Users;