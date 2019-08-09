const express = require('express');
const app = express();
const PORT = 3000;

const keys = require('./keys');

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true}).then(
    () => { console.log('Database connected') },
    err => { console.log(err) }
  );

const itemSchema = mongoose.Schema({
    body: String
});


const Item = mongoose.model('Item', itemSchema);

let firstItem = new Item({
    body: 'Buy food'
});

firstItem.save().then(
    entry => { console.log(entry) },
    err => { console.log(err) }
);



// get all items
app.get('/list', (req, res) => {

})

// create new item
app.post('/new_item', (req, res) => {

})

// delete item
app.delete('/remove_item', (req, res) => {

})





app.listen(PORT, () => console.log('Yes, Sir!'))