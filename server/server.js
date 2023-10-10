require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const compression = require("compression");
const helmet = require("helmet");
var cors = require('cors');

const postRoutes = require('./routes/postsRoute');
const commentRoutes = require('./routes/commentsRoute');
const userRoutes = require('./routes/usersRoute');

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// compress all routes
app.use(compression());

// routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);


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