var express = require('express');
var router = express.Router();

// get logout
router.get('/logout', function(req, res) {
  res.clearCookie('session');
  res.redirect('/login');
});

module.exports = router;
