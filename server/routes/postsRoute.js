const express = require('express');
const {
    getPosts,
    getPost,
    getAllTags,
    getPostsByTag,
    createPost,
    deletePost,
    updatePost,
} = require('../controllers/postsController');
const router = express.Router();

// GET all posts
router.get('/', getPosts);

// GET all tags
router.get('/tags', getAllTags);

// GET all posts by tag
router.get('/tags/:tag', getPostsByTag);

//GET one post
router.get('/:id', getPost);

//POST a new post
router.post('/', createPost);

//DELETE a post
router.delete('/:id', deletePost);

//UPDATE a post
router.patch('/:id', updatePost);

module.exports = router;