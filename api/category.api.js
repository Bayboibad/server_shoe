const myModel = require('../model/category')
const mongoose = require("mongoose");
const api_uri = "mongodb://127.0.0.1:27017/app_shoe_flutter";

exports.listCategoryApi = async (req,res,next) =>{
    await mongoose.connect(api_uri);
    const newCategory = await myModel.find();
    return res.status(200).json(newCategory);
}

