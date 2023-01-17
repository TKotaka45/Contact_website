const mongoose = require('mongoose')
const autoIncrementFactory = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: false},
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

userSchema.plugin(autoIncrementFactory)

module.exports = mongoose.model('User', userSchema)