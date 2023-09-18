const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

// /api/user/register
router.post('/register', async (req, res) => {
    // validation
    const error = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists')

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (error) {
        res.status(400).send(error)
        
    }
})

// /api/user/login
router.post('/login', (req, res) => {
    res.send('Login')
})

module.exports = router;