const express = require('express');
const router = express.Router();
const {Account} = require('../model/index.js');
const jwt = require('jsonwebtoken');

// Đăng nhập
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Account.findOne({
            where: {
                username,
                password // ⚠️ Lưu ý: bạn nên dùng bcrypt để hash mật khẩu thật sự!
            }
        });

        if (user) {
            const token = jwt.sign({ id: user.id }, 'mk');

            return res.json({
                errcode: 0,
                message: 'Đăng Nhập Thành Công',
                token: token,
                detailUser: {
                    name: user.name,
                    age: user.age,
                    phonenumber: user.phonenumber,
                    avatar: user.avatar,
                    role: user.role,
                    id: user.id
                }
            });
        } else {
            return res.json("Không tồn tại tài khoản");
        }
    } catch (err) {
        console.error(err);
        res.status(400).json('err from server');
    }
});

// Lấy thông tin chi tiết người dùng từ token
router.post('/getuserdetail', async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, 'mk');

        const user = await Account.findByPk(decoded.id);

        if (user) {
            res.json({
                errcode: 0,
                dataUser: user
            });
        } else {
            res.status(404).json({ errcode: 1, message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ errcode: 1, message: "Token invalid or expired" });
    }
});

module.exports = router;
