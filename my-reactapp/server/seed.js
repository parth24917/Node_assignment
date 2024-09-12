const mongoose = require('mongoose');
const BlogPost = require('../server/Models/Blog'); 
const User = require('../server/Models/User'); 
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
  
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


BlogPost.deleteMany();

const seedBlogs = async () => {
  try {
   
    const users = await User.find(); 
    if (!users || users.length === 0) {
      throw new Error('No users found in the database');
    }

   
    const blogs = [
      {
        title: 'First Blog Post',
        content: 'This is the content of the first blog post.',
        author: users[0]._id, 
      },
      {
        title: 'Second Blog Post',
        content: 'This is the content of the second blog post.',
        author: users[1] ? users[1]._id : users[0]._id, 
      },
      {
        title: 'Third Blog Post',
        content: 'Content for the third blog post.',
        author: users[0]._id, 
      },
    ];

    return blogs;
  } catch (err) {
    console.error('Error fetching users or seeding blogs:', err);
    return [];
  }
};


const addBlogPost = async (blog) => {
  const existingBlog = await BlogPost.findOne({ title: blog.title });
  if (!existingBlog) {
    const newBlog = new BlogPost(blog);
    await newBlog.save();
    console.log(`Blog post added: ${blog.title}`);
  } else {
    console.log(`Blog post already exists: ${blog.title}`);
  }
};


seedBlogs()
  .then((blogs) => {
    return Promise.all(blogs.map(addBlogPost));
  })
  .then(() => console.log('All blog posts added'))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
