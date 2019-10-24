const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;
const bodyParser = require('body-parser');
const logger = require('express-logger');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const keys = require('./keys');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(logger({path: "./logfile.txt"}));
app.use(cors());
app.use(passport.initialize());



if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'));
    app.use(express.static(path.join(__dirname, 'client/build')));
}

mongoose.set('useFindAndModify', false);
mongoose.connect(keys.mongoURI, {useNewUrlParser: true}).then(
    () => { console.log('Database connected') },
    err => { console.log(err) }
  );

require('./models/item');
require('./models/user');
require('./services/passport');
require('./routs/auth')(app);
require('./routs/items')(app);



app.listen(PORT, () => console.log('Yes, Sir!'))