
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const bcrypt = require('bcrypt')

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');


  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(400).send('Invalid credentials');

  
  const token = jwt.sign({ id: user._id }, 'APP');
  res.status(200).json({ token });
});
module.exports = app;
