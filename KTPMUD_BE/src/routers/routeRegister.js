const express = require('express');
const router = express.Router();
const { Account } = require('../model/index.js'); // Sequelize model
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Tạo thư mục uploads nếu chưa có
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Cấu hình lưu file với multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// POST /api/register
router.post('/', upload.single('file'), async (req, res) => {
    //console.log("req",req.body)
    console.log("req.file",req.file)
    try {
        const {
            username,
            password,
            avatar, // base64
            name,
            age,
            phonenumber,
            role
        } = req.body;

        const file = req.file; // ảnh thật

        // Kiểm tra user đã tồn tại
        const existingUser = await Account.findOne({ where: { username } });
        if (existingUser) {
            return res.json({
                message: 'Đã Tồn Tại Tài Khoản',
                errcode: 1
            });
        }

        // Tạo user mới
        await Account.create({
            username,
            password,
            avatar: file ? `/uploads/${file.filename}` : null, // lưu base64
           // avatarPath: file ? `/uploads/${file.filename}` : null, // lưu đường dẫn file nếu có
            name,
            age,
            phonenumber,
            role
        });

        return res.json({
            message: 'Đăng ký thành công',
            errcode: 0
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Lỗi server',
            errcode: 2
        });
    }
});

module.exports = router;
