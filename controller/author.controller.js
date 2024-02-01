const myModel = require('../model/author')
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer({ storage: storage });

exports.addAuthor = async (req, res, next) => {
    try {
        upload.single('brandLogo')(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ check: "Lỗi trong quá trình tải lên ảnh" });
            }
            const { brandName } = req.body;
            if (!brandName) {
                return res.status(400).json({ check: "Dữ liệu trống" });
            }
            const bannerFileName = req.file ? req.file.filename : null;

            let authors = {
                author: brandName,
                banner: bannerFileName
            }
            const kq = await myModel.insertMany(authors);
            res.redirect('/');
            console.log("Thêm thành công" + kq);
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ check: "Lỗi" });
    }
};
