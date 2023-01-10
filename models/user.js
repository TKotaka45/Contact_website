const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true,
            collation: {
              locale: 'en',
              strength: 2
            }
          }
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)