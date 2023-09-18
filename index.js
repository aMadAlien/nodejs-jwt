require('dotenv').config();

const express = require('express');
const app = express()

const mongoose = require('mongoose');
const authRouter = require('./routes/auth');

const port = 3000

// Connect to DB
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
).then(() => console.log('Connected to DB!'));


// Middleware
app.use(express.json());


// Route Middleware
app.use('/api/user', authRouter);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))