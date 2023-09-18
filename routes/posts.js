const router = require('express').Router();
const verify = require('./varifyToken');

router.get('/', verify, async (req, res) => {
    res.json({
        posts: {
            titls: 'my first post',
            description: 'random data for post'
        }
    });
});


module.exports = router;