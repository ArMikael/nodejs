const express = require('express');
const router = express.Router();
const Joi = require('joi');

const { User } = require('../models/user.model');


router.post('/', async (req, res) => {
    const login = await validateLogin(req.body);
});

function validateLogin() {
    return true;
}

module.exports = router;