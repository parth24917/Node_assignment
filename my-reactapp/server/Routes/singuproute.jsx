const bcrypt = require('bcrypt');
const multer = require('multer');
const User = require('./models/User'); 


const upload = multer({ dest: 'uploads/' });

app.post('/signup', upload.single('profileImage'), async (req, res) => {
  const { email, password } = req.body;
  const profileImage = req.file;

  const hashedPassword = await bcrypt.hash(password, 10);


  const newUser = new User({
    email,
    password: hashedPassword,
    profileImage: profileImage.path, 
  });

  await newUser.save();
  res.redirect('/login');
});
