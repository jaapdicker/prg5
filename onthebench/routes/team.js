var express = require('express');
var router = express.Router();
var dbmodels = require('../dbmodels');

router.get('/team/new', function(req, res) {
  var session = req.cookies['session'];

  if (session && !session.loggedIn) res.redirect('/login');

  res.render('team_new', {
    profile: session.user,
    message: {},
  });
});

// team create post
router.post('/team/new', function(req, res) {
  // create new club
  var team = new dbmodels.team(req.body);
  team.save(function(err, team) {
    if (err) {
      console.log('errors', err);
    }
    res.send('team created');
  });
});

module.exports = router;
