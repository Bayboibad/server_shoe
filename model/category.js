const db = require('../database/db');
const category =new db.mongoose.Schema({
    category: String,
},{collection:"tb_category"});
let Category = db.mongoose.model('category',category);
module.exports = Category;