const express = require('express');
const router = express.Router();

// GET all comments
router.get('/', (req, res) => res.json({msg:"All comments"}));

//GET comments of a post
router.get('/replyingTo/:id', (req, res) => res.json({msg:"All comments of a post"}));

//GET one comment
router.get('/:id', (req, res) => res.json({msg:"One comment"}));

//POST a new comment
router.post('/', (req, res) => res.json({msg:"Comment created"}));

//DELETE a comment
router.delete('/:id', (req, res) => res.json({msg:"Comment deleted"}));

//UPDATE a comment
router.patch('/:id', (req, res) => res.json({msg:"Comment updated"}));

module.exports = router;