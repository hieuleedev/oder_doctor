const express = require('express');
const router = express.Router();
const {Book,Clinic,Contact,Account} = require('../model/index.js');

// Tạo phòng khám mới
router.post('/', async (req, res) => {
    const { name, idDoctor, avatar, phonenumber } = req.body;

    try {
        const newClinic = await Clinic.create({
            name,
            idDoctor,
            avatar,
            phonenumber
        });

        res.json({
            message: 'create clinic success',
            errcode: 0,
            data: newClinic
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('error from server');
    }
});

// Lấy phòng khám theo idDoctor
router.get('/:id', async (req, res) => {
    const id = req.params.id;
   console.log("id",typeof id)
    try {
        const clinic = await Clinic.findOne({
            where: { idDoctor: Number(id) },
            include: [{ model: Account }],
            raw: true,
            nest: true // cần thiết để giữ object lồng nhau
        });
       // console.log("clinic",clinic)
       console.log("clinic",clinic)
        res.json({
            message: 'get clinic success',
            data: clinic
        });
    } catch (err) {
        console.error(err);
        res.status(500).json('error from server');
    }
});

module.exports = router;
