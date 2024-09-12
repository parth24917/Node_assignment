const express = require('express');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./Models/User.jsx');
require('dotenv').config()

const app = express();
const PORT = 5000;

// Enable CORS so that the frontend (React) can communicate with the backend
app.use(cors());

// Use JSON middleware to parse JSON bodies
app.use(express.json());

// Set up storage for profile image uploads using multer

// Set up storage for profile image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profile_images'); // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  }
});

const upload = multer({ storage: storage });



// MongoDB connection (Replace 'yourDB' with the actual name of your database)
mongoose.connect(process.env.MONGODB_URL, {

});

// Test the MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
app.get('/', (req, res) => {
    res.send('Welcome to the API');
  });
  
// Sign-up route to handle user registration
app.post('/api/auth/signup', upload.single('profileImage'), async (req, res) => {
  console.log('File:', req.file); 
  const { email, password } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the user's password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the provided email, hashed password, and profile image filename
    const newUser = new User({
      email,
      password: hashedPassword,
      profileImage: req.file.filename, // Save the filename of the uploaded profile image
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'User registered successflly' });
  } catch (error) {
    // Handle any errors that occur during the sign-up process
    console.error(error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


