const express = require('express');
const {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
} = require('../controllers/postsController');
const router = express.Router();

// GET all posts
router.get('/', getPosts);

//GET one post
router.get('/:id', getPost);

//POST a new post
router.post('/', createPost);

//DELETE a post
router.delete('/:id', deletePost);

//UPDATE a post
router.patch('/:id', updatePost);

module.exports = router;