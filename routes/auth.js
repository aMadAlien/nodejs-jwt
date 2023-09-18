const router = require('express').Router();
const User = require('../models/User');

// /api/user/register
router.post('/register', async (req, res) => {

    // create a user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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