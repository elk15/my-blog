const express = require('express');
const {
    getComments,
    getCommentsByPost,
    getComment,
    createComment,
    deleteComment,
    updateComment,
} = require('../controllers/commentsController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// GET all comments
router.get('/', getComments);

// GET all comments of a post
router.get('/replyingTo/:id', getCommentsByPost);

//GET one comment
router.get('/:id', getComment);

//POST a new comment
router.post('/', createComment);

// protect the routes bellow
router.use(requireAuth);

//DELETE a comment
router.delete('/:id', deleteComment);

//UPDATE a comment
router.patch('/:id', updateComment);

module.exports = router;