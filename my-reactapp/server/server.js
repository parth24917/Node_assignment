const express = require('express');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const User = require('./Models/User.jsx'); 
const BlogPost = require('./Models/Blog.jsx'); 

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profile_images'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});
const upload = multer({ storage: storage });


app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.post('/api/auth/signup', upload.single('profileImage'), async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      profileImage: req.file.filename, 
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});





app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await BlogPost.find(); 
    res.json(blogs);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
