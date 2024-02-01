const myModel = require('../model/product');
var multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

exports.addProduct = async (req, res, next) => {
    upload.fields([
        { name: 'banner', maxCount: 1 },
        { name: 'arrayImages', maxCount: 5 }
    ])(req, res, async function (err) {
        if (req.method === "POST") {
            try {
                const productName = req.body.productName;
                const productDescription = req.body.productDescription;
                const giaMoi = req.body.giaMoi;
                const giaCu = req.body.giaCu;
                const theLoai = req.body.theLoai;
                const nhanHang = req.body.nhanHang;
                const avatarPath = req.files.banner ? req.files.banner[0].path : null;
                const imagesPaths = req.files.arrayImages ? req.files.arrayImages.map(file => file.path) : [];

                let product = {
                    title: productName,
                    author: nhanHang, 
                    category: theLoai,
                    priceNew:giaMoi, 
                    priceOld:giaCu,
                    describe:productDescription,
                    banner: avatarPath,
                    arryImages: imagesPaths,
                };

                let kq = await myModel.create(product);
                console.log(kq);
              //  socket.io.emit("new msg", "Thêm Thành công");
                res.redirect("/");
            } catch (e) {
                console.log('lỗi', e);
                res.status(500).send('Internal Server Error');
            }
        }
    });
};



