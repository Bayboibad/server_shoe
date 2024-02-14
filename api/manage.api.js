const myModel = require('../model/product')
const Author = require("../model/author")
const Category = require("../model/category")
const mongoose = require("mongoose");
const api_url = "mongodb://127.0.0.1:27017/app_shoe_flutter";
var multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer({ storage: storage });

exports.addManageApi = async (req, res, next) => {
    upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'arryImages' ,maxCount:5}])(req, res, async function (err) {
        try {
            await mongoose.connect(api_url);

            const { title, author, category, priceNew,number,size, priceOld, describe } = req.body;

            if (!title || !author) {
                return res.status(400).json({ check: "Dữ liệu trống" });
            }
            console.log("Request Body:", req.body);
            console.log("Uploaded Files:", req.files);

            const bannerPath = req.files['banner'] ? req.files['banner'][0].path : null;
            const arryImagesPaths = req.files['arryImages'] ? req.files['arryImages'].map(file => file.path) : [];
            const newManage = new myModel({
                title, author, category, priceNew, priceOld, describe,
                number,size,
                banner: bannerPath,
                arryImages: arryImagesPaths,
            });

            await newManage.save();
            return res.status(200).json(newManage);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ check: "Lỗi" });
        }
    });
};


exports.updateManageApi = async (req, res, next) => {
    try {
        await mongoose.connect(api_url);

        const { title, author, category, priceNew, priceOld, describe } = req.body;
        if ( !author || !_id ) {
            return res.status(400).json({ check: "Dữ liệu không hợp lệ" });
        }



        const userID = await myModel.findByIdAndUpdate(_id);
        if (!userID) {
            return res.status(400).json({ check: "Không tìm thấy dữ liệu" });
        }

        if (title) userID.title = title;
        if (author) userID.author = author;
        if (banner) userID.banner = banner;

        await userID.save();

        return res
            .status(200)
            .json(userID);
    } catch (err) {
        return res.status(500).json({ check: err });
    }
};
exports.deleteManageApi = async (req, res, next) => {
    try {
        await mongoose.connect(api_url);

        const { _id } = req.query;

        const result = await myModel.findOneAndDelete({ _id });
        if (!result) {
            return res.status(400).json({ check: "Không tìm thấy người dùng" });
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ err });
    }
};
exports.listAllProduct = async (req, res, next) => {
    try {
        await mongoose.connect(api_url);

        const products = await myModel.find().populate({
            path: "author",
            model: Author,
            select: "author",
        }).populate({
            path: "category",
            model: Category,
            select: "category",
        });

        const dataProduct = products.map((data) => ({
            id: data.id,
            title: data.title,
            category:data.category.category,
            author: data.author.author, // Assuming 'author' is a field in Author model
            describe: data.describe,
            priceOld: data.priceOld,
            priceNew: data.priceNew,
            banner: data.banner,
            number: data.number,
            size:data.size,
            arryImages: data.arryImages,
            createdAt: data.createdAt,
        }));
        return res.status(200).json(dataProduct);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ check: "Lỗi" });
    }
};
exports.listFindCateApi= async(req,res,next)=>{
    try {
        await mongoose.connect(api_url);
        const{category} = req.query;
        const products = await myModel.find({category:category})

        const dataProduct = products.map((data) => ({
            id: data.id,
            title: data.title,
            category:data.category,
            author: data.author.author, // Assuming 'author' is a field in Author model
            describe: data.describe,
            priceOld: data.priceOld,
            priceNew: data.priceNew,
            banner: data.banner,
            number: data.number,
            size:data.size,
            arryImages: data.arryImages,
            createdAt: data.createdAt,
        }));
        return res.status(200).json(dataProduct);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ check: "Lỗi" });
    }
}