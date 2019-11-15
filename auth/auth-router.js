const router = require('express').Router();
const UserHelper = require('./auth-model');

router.post('/register', (req, res) => {
  UserHelper.register(req.body)
  .then(data => {
    res.status(201).json({message: `New user, with username ${req.body.username} has been created! Good luck!`})
  })
  .catch(err => {
    res.status(401).json({message: `Something bad happened: ${err.message}`})
  })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
