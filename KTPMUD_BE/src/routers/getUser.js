const express = require('express');
const router = express.Router();
const {Account} = require('../model/index.js');

// GET users by role
router.get('/:role', async (req, res) => {
    const role = req.params.role;
    const roleText = {
        '1': 'admin',
        '2': 'doctor',
        '3': 'patient',
        '4': 'y tá'
    }[role] || 'unknown';

    try {
        const users = await Account.findAll({ where: { role } });
        res.json({
            message: `get ${roleText} user success`,
            errcode: 0,
            data: users
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', errcode: 1 });
    }
});

// UPDATE user by ID
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, age, username, phonenumber } = req.body;

    try {
        await Account.update(
            { name, age, username, phonenumber },
            { where: { id } }
        );

        const updated = await Account.findByPk(id);
        res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Update failed' });
    }
});

// DELETE user by ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log("id",id)
    try {
        const deleted = await Account.destroy({ where: { id } });
        res.json({ message: 'Delete success', deleted });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Delete failed' });
    }
});

module.exports = router;
