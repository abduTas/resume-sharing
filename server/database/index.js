const mongoose = require('mongoose')
mongoose.Promise = global.Promise
// use 27017 for 
const uri = 'mongodb://localhost:27017 /mern-passport-login'

mongoose.connect(uri)
    .then(() => console.log("Mongodb connection estrablished"))
    .catch(err => console.log(err))

module.exports = mongoose.connection;