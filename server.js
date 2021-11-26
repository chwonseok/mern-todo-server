const express = require('express');
const app = express();
const mongoose = require('mongoose');
const TodoModel = require('./models/Todos');

// DB Connection
mongoose.connect(
  'mongodb+srv://chws:rkskekfk12@cluster0.sc83b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  () => {
    app.listen(3003, () => {
      console.log('Server is listening on 3003');
    });
  }
);

app.get('/insert', async (req, res) => {
  const todo = new TodoModel({ date: '2021-11-27', task: 'finish MERN study' });
  await todo.save();
  res.send('DATA SAVED');
});

app.get('/read', async (req, res) => {
  TodoModel.find({}, (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});
