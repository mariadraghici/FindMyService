const mongoose = require('mongoose')
const user = require('./user')
const Schema = mongoose.Schema

const tokenSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: 60*60*24 }
    }
})

module.exports = mongoose.model('Token', tokenSchema)