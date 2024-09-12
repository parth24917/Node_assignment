app.get('/dashboard', authenticateJWT, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

// JWT middleware to authenticate
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(403).send('Token missing');

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};
