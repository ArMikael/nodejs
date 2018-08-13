const express = require('express');
const router = express.Router();
const Joi = require('joi');

const { User } = require('../models/user.model');


router.post('/', async (req, res) => {
    const user = await User.find({ email: req.body.email });
    console.log(user);

    if (!user) return res.status('404').send('User with such email doesn\'t exist.');

    res.status(200).send(user);
});

module.exports = router;