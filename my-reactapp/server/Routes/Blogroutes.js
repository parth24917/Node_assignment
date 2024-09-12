const express = require('express');
const router = express.Router();
const BlogPost = require('../Models/Blog'); 


router.post('/create', async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id; 
    const newPost = new BlogPost({ title, content, author: userId });
    await newPost.save();
    res.json({ message: 'Blog post created!' });
});

router.get('/blogs', async (req, res) => {
    const blogs = await BlogPost.find().populate('author');
    res.json(blogs);
});

router.delete('/delete/:id', async (req, res) => {
    const blogId = req.params.id;
    await BlogPost.findByIdAndDelete(blogId);
    res.json({ message: 'Blog post deleted!' });
});

module.exports = router;
