const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');


const keys = require('./keys');

app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect(keys.mongoURI, {useNewUrlParser: true}).then(
    () => { console.log('Database connected') },
    err => { console.log(err) }
  );

const itemSchema = mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item', itemSchema);

class ApiItem {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

// get all items
app.get('/items', (req, res) => {
    Item.find({}).then(
        result => { 
            res.send(result.map(item => { return new ApiItem(item._id, item.name) })); 
        },
        err => { 
            console.log(err) 
        }
    ).catch(reason => {
        console.log(reason);
        res.status(500).end();
    });
})

// create a new item
app.post('/items', (req, res) => {
    let item = new Item({
        name: req.body.name
    });
    
    item.save().then(
        result => {
            res.send(new ApiItem(result._id, result.name))
        },
        err => {
            console.log(err)
        }
    ).catch(reason => {
        console.log(reason);
        res.status(500).end();
    });
})

// delete an item
// !!! code 200 in did not find id --- fix it!
app.delete('/item/:id', (req, res) => {
    let objectId = mongoose.Types.ObjectId(req.params.id)
    Item.deleteOne({_id: objectId}).then(
        () => {
            console.log('done');
            res.status(200).end();
        },
        err => {
            console.log(err);
            res.status(404).end();
        }
    ).catch(reason => {
        console.log(reason);
        res.status(500).end();
    });
})

// edit an item
app.patch('/item/:id', (req, res) => {
    let objectId = mongoose.Types.ObjectId(req.params.id)
    Item.findOneAndUpdate({_id: objectId}, req.body, { new: true }).then(
        result => {
            if (result != null) {
                res.send(new ApiItem(result._id, result.name))
            } else {
                res.status(404).end()
            }
        },
        err => {
            console.log(err);
            res.status(500).end();    
        }
    ).catch(reason => {
        console.log(reason);
        res.status(500).end();
    });
})


app.listen(PORT, () => console.log('Yes, Sir!'))