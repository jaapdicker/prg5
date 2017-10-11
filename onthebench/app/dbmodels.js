var mongoose = require('./helpers/databaseHelper');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema,
    SALT_WORK_FACTOR = 10,
    ObjectId = Schema.ObjectId;

// team
var teamSchema = new Schema({
  id: ObjectId,
  name: { type: String, required: true },
  teamnr: { type: String, required: true },
  matchday: {
    type: String,
    required: true,
    enum: ['saturday', 'sunday']
  },
  class: { type: String, required: true },
  _captainId: { type: Schema.Types.ObjectId, ref: 'user' },
  _clubId: { type: Schema.Types.ObjectId, ref: 'club' }
}, { collection: 'Teams' });
var team = mongoose.model('team', teamSchema);

// team classes
var divisionSchema = new Schema({
  id: ObjectId,
  name: { type: String, required: true },
}, { collection: 'Divisions' });
var division = mongoose.model('division', divisionSchema)

// binding model user - event
var user_eventSchema = new Schema({
  id: ObjectId,
  _personId: { type: Schema.Types.ObjectId, ref: 'user' },
  _eventId: { type: Schema.Types.ObjectId, ref: 'event' },
  presence: {
    type: String,
    enum: ["accepted", "pending", "declined", "empty"],
    default: 'empty'
  }
}, { collection: 'Players' });
var user_event = mongoose.model('player', user_eventSchema);

// event
var eventSchema = new Schema({
  id: ObjectId,
  type: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: String,
  _teamId: { type: Schema.Types.ObjectId, ref: 'team' },
}, { collection: 'Events' });
var event = mongoose.model('event', eventSchema);

// club
var clubSchema = new Schema({
  id: ObjectId,
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postal: { type: String, required: true },
}, { collection: 'Clubs' });
var club = mongoose.model('club', clubSchema);

var club_teamSchema = new Schema({
  id: ObjectId,
  _clubId: [{ type: Schema.Types.ObjectId, ref: 'club' }],
  _teamId: [{ type: Schema.Types.ObjectId, ref: 'team' }]
});
var club_team = mongoose.model('event', eventSchema);

// user
var userSchema = new Schema({
  id: ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  _teamId: { type: Schema.Types.ObjectId, ref: 'team' }
}, { collection: 'Users' });

// hash user password
userSchema.pre('save', function(next) {
  var user = this;

  // only hash password if new or modified
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash password
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // replace with hash
      user.password = hash;
      next();
    });
  });
});

// verify input password with hashed password
userSchema.methods.verifyPassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

var user = mongoose.model('user', userSchema);

var dbmodels = {
  club: club,
  division: division,
  event: event,
  team: team,
  user: user,
  userEvent: user_event,
  clubTeam: club_team
}

module.exports = dbmodels;
