/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = function cookielock(req, res, next) {
  if (req.session && req.session.userID) {
    next();
  } else {
    res.status(401).json({ message: 'you shall not pass!!' });
  }
}