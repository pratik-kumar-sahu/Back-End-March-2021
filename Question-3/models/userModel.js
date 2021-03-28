const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
});

userSchema.pre('save', async function (next) {
  const user = this;
  var encrypted = await bcrypt.hash(user.password, 8);
  user.password = encrypted;
  next();
});

module.exports = mongoose.model('User', userSchema);
