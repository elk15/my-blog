require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.json());

// routes

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port ', process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    });