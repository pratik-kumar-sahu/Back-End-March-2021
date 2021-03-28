const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  list: {
    type: String,
    required: true,
  },
  // author: {
  //   type: String,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Todo', todoSchema);
