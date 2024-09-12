const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
