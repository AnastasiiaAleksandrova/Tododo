const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

const keys = require('./keys');

app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true}).then(
    () => { console.log('Database connected') },
    err => { console.log(err) }
  );

const itemSchema = mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemSchema);

// get all items
app.get('/items', (req, res) => {
    Item.find({}).then(
        result => { console.log(result) },
        err => { console.log(err) }
    );

    res.end();
})

// create a new item
app.post('/items', (req, res) => {
    console.log(req.body);
    let item = new Item({
        name: req.body.name
    });
    
    item.save().then(
        entry => { console.log(entry) },
        err => { console.log(err) }
    );

    res.end();
})

// delete an item
app.delete('/items', (req, res) => {

})

// edit an item
app.patch('/items', (req, res) => {

})


app.listen(PORT, () => console.log('Yes, Sir!'))