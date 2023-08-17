const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const playerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'team'
  }

});

module.exports = mongoose.model("player", playerSchema);