const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
});

const TodoModel = mongoose.model('todos', TodoSchema);

module.exports = TodoModel;
