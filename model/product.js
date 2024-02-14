const db = require('../database/db');
const Author = require("../model/user");
const Category = require("../model/category");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productShema = new db.mongoose.Schema({
    title: String,
    priceOld:Number,
    priceNew:Number,
    category:{
        type: Schema.Types.ObjectId,
        ref: Category, 
        required: true,
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: Author, 
        required: true,
    },
    describe: String,
    number: Number,
    size:[String],
    banner: String,
    arryImages:[String]
}, { collection: "tb_product", timestamps: true });
let Product = db.mongoose.model('products', productShema);
module.exports = Product;