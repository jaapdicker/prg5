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
  password: String,
  team: Object,
}, { collection: 'Users' });
var user = mongoose.model('user', userSchema);


// team
var teamSchema = new Schema({
  id: ObjectId,
  name: String,
  players: Array,
  captain: Object
}, { collection: 'Teams' });
var team = mongoose.model('team', teamSchema);

// event
var eventSchema = new Schema({
  id: ObjectId,
  type: String,
  name: String,
  date: Date,
  location: String,
  players: Array
}, { collection: 'Events' });
var event = mongoose.model('event', eventSchema);

// club
var clubSchema = new Schema({
  id: ObjectId,
  address: String,
  teams: Array
}, { collection: 'Clubs' });
var club = mongoose.model('club', clubSchema);

var dbmodels = {
  club: club,
  event: event,
  team: team,
  user: user,
}

module.exports = dbmodels;
