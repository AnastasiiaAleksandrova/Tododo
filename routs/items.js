const { check, validationResult } = require('express-validator');
//const longpoll = require('express-longpoll')(app, { DEBUG: true });
const mongoose = require('mongoose');
const Item = mongoose.model('Item');

class ApiItem {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

// long poll
//longpoll.create("/poll");

module.exports = (app) => {
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


    app.post('/items', [check('name').isLength({min: 1})], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            
            await new Item(req.body).save();
            
            let updatedList = await Item.find({});
            updatedList = updatedList.map(item => { return new ApiItem(item._id, item.name) });
            //longpoll.publish("/poll", updatedList);
            res.end();
        } catch (e) {
            res.status(500).end();
        } 
    })


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

}

// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });