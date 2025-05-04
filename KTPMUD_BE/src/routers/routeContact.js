const express = require('express');
const router = express.Router();
const {Book,Clinic,Contact,Account,Comment} = require('../model/index.js');

// Tạo contact mới
router.post('/', async (req, res) => {
    const { fullname, phone, text } = req.body;

    try {
        const contact = await Contact.create({ fullname, phone, text });

        res.json({
            message: 'create contact success',
            errcode: 0,
            commentDetail: contact
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('error from server');
    }
});

// Lấy toàn bộ contact
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.findAll();

        res.json({
            message: 'get contact success',
            data: contacts
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('error from server');
    }
});

// Xóa contact theo ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Contact.destroy({ where: { id } });
        res.status(200).json({
            message: result ? 'delete contact success' : 'not found',
            deleted: result
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('error from server');
    }
});

module.exports = router;
