const mongoose = require('mongoose');
const { Schema } = mongoose; 

const itemSchema = new Schema({
    name: String
});

mongoose.model('Item', itemSchema);