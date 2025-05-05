const express = require('express');
const router = express.Router();
const {Book,Clinic,Contact, Account} = require('../model/index.js');


// Tạo lịch khám (POST)
router.post('/', async (req, res) => {
    const { typeTime, idClinic, iduser } = req.body;
    const id = Number(iduser)
    console.log("req.body",req.body)
    try {
        const existing = await Book.findOne({
            where: { typeTime, idClinic,idUser: id}
        });

        if (existing) {
            return res.json({
                message: 'Đã tồn tại lịch khám này',
                errcode: 1,
                data: existing
            });
        }

        const newBooking = await Book.create({ typeTime, idClinic, idUser: id });

        res.json({
            message: 'Đã tạo lịch khám thành công',
            errcode: 0,
            data: newBooking
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('error from server');
    }
});

// Xóa lịch theo ID (DELETE)
router.delete('/user/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deleted = await Book.destroy({ where: { id } });
        res.json({ message: 'Xóa thành công', deleted });
    } catch (err) {
        console.error(err);
        res.status(500).json('error from server');
    }
});

// Lấy danh sách lịch khám (GET)
router.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let data;

        if (id === 'all') {
            
            data = await Book.findAll({ include: [Clinic, Account] });
        } else if ([1, 2, 3].includes(Number(id))) {
            data = await Book.findAll({
                where: { idClinic: id },
                include: [Clinic, Account],
                raw: true,
                nest: true // cần thiết để giữ object lồng nhau
            });
        } else {
            //console.log("thoe nguoi dung",)
            data = await Book.findAll({
                where: { iduser: id },
                include: [Clinic, Account],
                raw: true,
                nest: true // cần thiết để giữ object lồng nhau
            });
        }
       // console.log("data",data)
        res.json({
            message: 'get book success',
            data
        });

    } catch (err) {
        console.error(err);
        res.status(500).json('error from server');
    }
});

module.exports = router;
