const express = require('express');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();

const middleware = require('./middlewares/middleware');

const Todo = require('./models/todoModel');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

mongoose
  .connect(
    'mongodb+srv://backendpro:12334455@@cluster-backend-attainu.6rqij.mongodb.net/todoData?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log('Database connected!'))
  .catch((err) => {
    console.log('ERROR OCCURRED ', err.message);
  });

// app.use(
//   expressSession({
//     secret: 'ToDoApp',
//     saveUninitialized: false,
//     resave: false,
//     store: mongoStore.create({
//       mongoUrl:
//         'mongodb+srv://backendpro:12334455@@cluster-backend-attainu.6rqij.mongodb.net/todoData?retryWrites=true&w=majority',
//       ttl: 1 * 24 * 60 * 60,
//     }),
//   }),
//   middleware.currentUser
// );

// ROUTE HANDLING
app.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: 'asc' });
    res.render('mainPage', {
      todos,
    });
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/', async (req, res) => {
  try {
    await Todo.create(req.body);
    res.redirect('/');
  } catch (err) {
    console.log('todo cannot be created');
    console.log(err.message);
  }
});

app.get('/del', async (req, res) => {
  try {
    await Todo.findOneAndDelete(req.body.name);
    res.redirect('/');
  } catch (err) {
    console.log(err.message);
  }
});

const PORT = 5300;
app.listen(PORT, () => {
  console.log(`Server is running at localhost://${PORT}`);
});
