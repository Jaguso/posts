const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
);


app.get('/', (req, res) => {
    res.send("it works");
});

module.exports = app;