const router = require('express').Router();
const UserHelper = require('./auth-model');


//requiring middleware
const bcrypt = require('bcryptjs');


const cookielock = require('./authenticate-middleware');


router.get('/', cookielock, (req, res) => {
  UserHelper.getAll()
  .then(data => {
    res.status(200).json(data);
  })
})

router.post('/register', (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;
  UserHelper.register(req.body)
  .then(() => {
    res.status(201).json({message: `New user, with username ${req.body.username} has been created! Good luck!`})
  })
  .catch(err => {
    res.status(401).json({message: `Something bad happened: ${err.message}`})
  })
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;
  UserHelper.login(username)
  .then(user => {
  if(!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({error: `Incorrect Creds`})
  } else {
      req.session.userID = user;
      return res.status(200).json({message: `Welcome, ${user.username}!`})
  }
  })
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('error logging out');
      } else {
        res.send('good bye');
      }
    });
  }
});

module.exports = router;
