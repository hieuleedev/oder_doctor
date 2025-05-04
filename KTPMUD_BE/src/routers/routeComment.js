const express = require('express');
const router = express.Router();
const {Book,Clinic,Contact,Account,Comment} = require('../model/index.js');

// Tạo comment mới
router.post('/', async (req, res) => {
    const { star, content, comment_img, iduser } = req.body;

    try {
        const comment = await Comment.create({
            star,
            content,
            comment_img,
            iduser
        });

        res.json({
            message: 'create comment success',
            errcode: 0,
            commentDetail: comment
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('error from server');
    }
});

// Lấy toàn bộ comment (có include user info)
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [{ model: Account }]
        });

        res.json({
            message: 'get comment success',
            data: comments
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('error from server');
    }
});

// Đếm số comment theo số sao
router.get('/count/:star', async (req, res) => {
    const star = req.params.star;

    try {
        const count = await Comment.count({ where: { star } });
        res.status(200).json({ length: count });
    } catch (err) {
        console.error(err);
        res.status(500).json('error from server');
    }
});

module.exports = router;
