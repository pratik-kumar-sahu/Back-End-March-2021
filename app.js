const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();

const Form = require('./model/form');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

mongoose
  .connect(
    'mongodb+srv://backendpro:12334455@@cluster-backend-attainu.6rqij.mongodb.net/usersData?retryWrites=true&w=majority',
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

// ROUTE HANDLING
app.get('/', (req, res) => {
  res.render('form');
});

app.post('/form', async (req, res) => {
  try {
    const formSubmitted = await Form.create(req.body);
    if (formSubmitted) {
      res.render('submitted');
    } else {
      console.log('Not submitted');
      res.redirect('/');
    }
  } catch (err) {
    console.log(err.message);
  }
});

const PORT = 5200;
app.listen(PORT, () => {
  console.log(`Server is running at localhost://${PORT}`);
});
