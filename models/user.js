<<<<<<< HEAD
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

=======
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

>>>>>>> da00b4ab8808edc54e00810eb49979dddfbb40cd
module.exports = mongoose.model('User', userSchema)