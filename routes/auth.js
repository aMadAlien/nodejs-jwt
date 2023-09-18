const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
router.post('/login', async (req, res) => {
    // validation
    const error = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email doesn\'t exist')

    // validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).status(200).send(token)
})

module.exports = router;