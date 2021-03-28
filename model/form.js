const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  emotions: {
    type: [],
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Form', formSchema);
