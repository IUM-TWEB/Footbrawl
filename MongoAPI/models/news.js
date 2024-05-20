const mongoose = require('mongoose');

const news = new mongoose.Schema({
  id: Number,
  titolo: String,
  titoletto: String,
  testo: String,
  autore: String,
  img: String
})

module.exports = mongoose.model('news', news)
