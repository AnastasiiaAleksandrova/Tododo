if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: process.env.DB_TOKEN
    }
} else {
    module.exports = require('./dev_keys.js')
}