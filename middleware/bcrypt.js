const helper = require('../auth/auth-model');
const bcrypt = require('bcryptjs');
module.exports = function restricted(req, res, next) {
    const { username, password } = req.body;
  
    // no point on querying the database if the headers are not present
    if (username && password) {
      helper.login(username)
        .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            next();
          } else {
            res.status(401).json({ message: 'Invalid Credentials' });
          }
        })
        .catch(error => {
          res.status(500).json({ message: 'Unexpected error' });
        });
    } else {
      res.status(400).json({ message: 'No credentials provided' });
    }
  };

//Done