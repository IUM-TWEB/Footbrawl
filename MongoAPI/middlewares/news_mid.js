const queries = require('../queries/news_queries');

module.exports.getById = async (req, res) => {
  try {
    const news = await queries.getById(req.params.id);
    res.send(news);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const news = await queries.getAll();
    res.send(news);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
