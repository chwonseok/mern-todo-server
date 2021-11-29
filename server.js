const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const TodoModel = require('./models/Todos');

///// DB Connection
app.use(cors()); // cors: FE와 BE 연결해주는 라이브러리
app.use(express.json()); // FE에서 받은 data를 json으로 바꿔줌

mongoose.connect(
  'mongodb+srv://chws:rkskekfk12@cluster0.sc83b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  () => {
    app.listen(3003, () => {
      console.log('Server is listening on 3003');
    });
  }
);

// Client -> POST request -> DB에 add
app.post('/add', async (req, res) => {
  const date = req.body.date;
  const task = req.body.task;
  const todo = new TodoModel({ date: date, task: task });
  await todo.save();
  res.send('SUCCESSFULLY SAVED DATA');
});

// Update
app.put('/update', async (req, res) => {
  console.log(req);
  const id = req.body.id; // update 시킬 todo의 id를 가져옴
  const newTask = req.body.task;

  try {
    await TodoModel.findById(id, (error, taskObj) => {
      taskObj.task = newTask;
      taskObj.save();
    });
  } catch (error) {
    console.log(error);
  }

  res.send('UPDATE COMPLETED');
});

// Client <- GET request <- DB에서 read
app.get('/read', async (req, res) => {
  TodoModel.find({}, (error, result) => {
    if (error) res.send(error);
    res.send(result);
  });
});
