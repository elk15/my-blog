const express = require('express');
const {
    getPosts,
    getPublishedPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
} = require('../controllers/postsController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// GET all published posts
router.get('/published', getPublishedPosts);

//GET one post
router.get('/:id', getPost);

// protect the routes bellow 
router.use(requireAuth);

// GET all posts
router.get('/', getPosts);

//POST a new post
router.post('/', createPost);

//DELETE a post
router.delete('/:id', deletePost);

//UPDATE a post
router.patch('/:id', updatePost);

module.exports = router;