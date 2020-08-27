const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tollSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  userid: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Toll = mongoose.model('Toll', tollSchema);

module.exports = Toll;