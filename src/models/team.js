const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  players: {
    type: [{
      type: [Schema.Types.ObjectId],
      ref: 'player'
    }],
    validate: [limit, '{PATH} exceeds the limit of 15']
  }

});

//limits the players to 15 in a team.
function limit(val){
  return val.length <=15;
}

module.exports = mongoose.model("team", teamSchema);