const News = require('../models/news');

module.exports.getById = async (id) => {
  try {
    const result = await News.findOne({id: id});
    if (!result) {
      throw new Error('Nessuna notizia trovata con l\'ID specificato');
    }
    return result;
  } catch (error) {
    console.error('Errore durante la ricerca della notizia:', error);
    throw error;
  }
}

module.exports.getAll = async (id) => {
  try {
    const result = await News.find().limit(10);
    if (!result) {
      throw new Error('Nessuna notizia trovata');
    }
    return result;
  } catch (error) {
    console.error('Errore durante la ricerca della notizia:', error);
    throw error;
  }
}

