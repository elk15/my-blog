const express = require('express');
const router = express.Router();

// GET all posts
router.get('/', (req, res) => res.json({msg:"All posts"}));

//GET one post
router.get('/:id', (req, res) => res.json({msg:"One post"}));

//POST a new post
router.post('/', (req, res) => res.json({msg:"Post created"}));

//DELETE a post
router.delete('/:id', (req, res) => res.json({msg:"Post deleted"}));

//UPDATE a post
router.patch('/:id', (req, res) => res.json({msg:"Post updated"}));

module.exports = router;