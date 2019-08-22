const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;
const bodyParser = require('body-parser');
const logger = require('express-logger');
const { check, validationResult } = require('express-validator');
var longpoll = require("express-longpoll")(app, { DEBUG: true });


const keys = require('./keys');

app.use(bodyParser.json());
app.use(logger({path: "./logfile.txt"}));
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



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

// long poll
longpoll.create("/poll");


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
app.post('/items', [check('name').isLength({min: 1})], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        
        await new Item(req.body).save();
        
        let updatedList = await Item.find({});
        updatedList = updatedList.map(item => { return new ApiItem(item._id, item.name) });
        longpoll.publish("/poll", updatedList);
        res.end();
    } catch (e) {
        res.status(500).end();
    } 
})

// delete an item
app.delete('/item/:id', (req, res) => {
    try {
        let query = { _id: mongoose.Types.ObjectId(req.params.id) }
        console.log(Item.deleteOne(query, (err, result) => {
            if (!err && result.n > 0) {
                res.status(200).end()
            } else {
                res.status(404).end()
            }
        }))
    } catch (t) {
        res.status(500).end()
    }
})

// edit an item
app.patch('/item/:id', [
    check('name').isLength({min: 1})
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      
      let objectId = mongoose.Types.ObjectId(req.params.id);
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