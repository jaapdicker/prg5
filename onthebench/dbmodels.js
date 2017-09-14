var mongoose = require('./helpers/databaseHelper');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// user
var userSchema = new Schema({
  id: ObjectId,
  firstName: String,
  lastName: String,
  position: String,
  email: String,
  password: String
}, { collection: 'Users' });
var user = mongoose.model('user', userSchema);


// team
var teamSchema = new Schema({
  id: ObjectId,
  teamnr: Number,
  matchday: {
    type: String,
    enum: ["saturday", "sunday"]
  },
  class: Number,
  _captain: { type: Schema.Types.ObjectId, ref: 'user' },
  _clubId: { type: Schema.Types.ObjectId, ref: 'club' }
}, { collection: 'Teams' });
var team = mongoose.model('team', teamSchema);

// binding model user - event
var user_eventSchema = new Schema({
  id: ObjectId,
  person: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  event: [{ type: Schema.Types.ObjectId, ref: 'event' }],
  presence: {
    type: String,
    enum: ["accepted", "pending", "declined", "empty"],
    default: 'empty'
  }
});
var user_event = mongoose.model('player', user_eventSchema);

// role tabel
// id
// name
//
// (Bijv: 1, player.  2, captain)

// koppeltabel user / role
// id
// user_id
// team_id
//
// (Bijv: 1, 10, 1)
// ^ In dit geval zit dus user 10 in team 1,
// user heeft dan een rol: player (of captain) dat staat los van deze tabel


// koppetabel user / event
// id
// user_id
// event_id
//
// (Bijv: 1, 10, 5)
// ^ In dit geval zit user 10 in event 5, event 5 is bijvoorbeeld een training of wedstrijd
// En je kan vanuiter user_id=10 ophalen welke rol hij heeft binnen welk team

// event
var eventSchema = new Schema({
  id: ObjectId,
  type: String,
  name: String,
  date: Date,
  location: String,
  team: [{ type: Schema.Types.ObjectId, ref: 'team' }],
  players: [{ type: Schema.Types.ObjectId, ref: 'player' }]
}, { collection: 'Events' });
var event = mongoose.model('event', eventSchema);

// club
var clubSchema = new Schema({
  id: ObjectId,
  name: String,
  address: String,
  city: String,
  postal: String
}, { collection: 'Clubs' });
var club = mongoose.model('club', clubSchema);

var club_teamSchema = new Schema({
  id: ObjectId,
  clubId: [{ type: Schema.Types.ObjectId, ref: 'club' }],
  teamId: [{ type: Schema.Types.ObjectId, ref: 'team' }]
});
var club_team = mongoose.model('event', eventSchema);

var dbmodels = {
  club: club,
  event: event,
  team: team,
  user: user,
  userEvent: user_event,
  clubTeam: club_team
}

module.exports = dbmodels;
