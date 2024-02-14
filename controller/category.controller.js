const myModel = require('../model/category')
const socket = require("../socket");

exports.addCategory = async (req, res, next) => {
    if (req.method == 'POST') {
        try {
            const categoryName = req.body.categoryName;
    
            let categorys = {
                category: categoryName,
            }
            const kq = await myModel.create(categorys);
            socket.io.emit("new msg", "Thêm Thành công");

            res.redirect('/');
            console.log("Thêm thành công" + kq);
        } catch (e) {
            console.log("Thêm không thành công");
        }
    }
};