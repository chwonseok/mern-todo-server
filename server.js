const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const TodoModel = require('./models/Todos');

///// DB Connection
app.use(cors()); // cors is a library to allow connect frontend and backend
app.use(express.json()); // it allowes to get data as json whenever you need to receive data from frontend

mongoose.connect(
  'mongodb+srv://chws:rkskekfk12@cluster0.sc83b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  () => {
    app.listen(3003, () => {
      console.log('Server is listening on 3003');
    });
  }
);

app.post('/addtodo', async (req, res) => {
  const date = req.body.date;
  const task = req.body.task;
  const todo = new TodoModel({ date: date, task: task });
  await todo.save();
  res.send('SUCCESSFULLY SAVED DATA');
});

app.get('/read', async (req, res) => {
  TodoModel.find({}, (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});
