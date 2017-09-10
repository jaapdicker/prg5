var mongoose = require('./helpers/dbconnect');

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
});
var user = mongoose.model('user', userSchema);


// team
var teamSchema = new Schema({
  id: ObjectId,
  name: String,
  players: Array,
  captain: Object
});
var team = mongoose.model('team', teamSchema);

// event
var eventSchema = new Schema({
  id: ObjectId,
  type: String,
  name: String,
  date: Date,
  location: String,
  players: Array
});
var event = mongoose.model('event', eventSchema);

// club
var clubSchema = new Schema({
  id: ObjectId,
  address: String,
  teams: Array
});
var club = mongoose.model('club', clubSchema);

var dbmodels = {
  club: club,
  event: event,
  team: team,
  user: user,
}

module.exports = dbmodels;
