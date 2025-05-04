const express = require('express');
const router = express.Router();
const {Account} = require('../model/index.js'); // Sequelize model
const jwt = require('jsonwebtoken');

// Đăng ký tài khoản mới
router.post('/', async (req, res) => {
    const { username, password, avatar, name, age, phonenumber, role } = req.body;

    try {
        const existingUser = await Account.findOne({ where: { username } });

        if (existingUser) {
            return res.json({
                message: 'Đã Tồn Tại Tài Khoản',
                errcode: 1
            });
        }

        await Account.create({
            username,
            password,
            avatar,
            name,
            age,
            phonenumber,
            role
        });

        return res.json({
            message: 'create success',
            errcode: 0
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'err from server',
            errcode: 2
        });
    }
});

module.exports = router;
