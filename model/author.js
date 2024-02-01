const db = require('../database/db');
const author =new db.mongoose.Schema({
    author: String,
    banner:String,
},{collection:"tb_author"});
let Author = db.mongoose.model('author',author);
module.exports = Author;