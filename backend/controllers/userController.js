const registeredUser = (req, res) => {
  res.send('Register Route');
};

const loginUser = (req, res) => {
  res.send('Login Route');
};

module.exports = {
  registeredUser,
  loginUser,
};
