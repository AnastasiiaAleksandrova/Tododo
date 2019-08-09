const express = require('express');
const app = express();
const PORT = 3000;

const keys = require('./keys');

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true}).then(
    () => { console.log('Database connected') },
    err => { console.log(err) }
  );


app.listen(PORT, () => console.log('Yes, Sir!'))