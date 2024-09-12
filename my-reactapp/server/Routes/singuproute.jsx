// signup route
const bcrypt = require('bcrypt');
const multer = require('multer');
const User = require('./models/User'); // Mongoose model

// Multer config for file upload
const upload = multer({ dest: 'uploads/' });

app.post('/signup', upload.single('profileImage'), async (req, res) => {
  const { email, password } = req.body;
  const profileImage = req.file;

  // Validate and hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store user in DB
  const newUser = new User({
    email,
    password: hashedPassword,
    profileImage: profileImage.path, // Save image path
  });

  await newUser.save();
  res.redirect('/login');
});
