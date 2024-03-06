const fs = require('fs');
const movies = JSON.parse(fs.readFileSync(`${__dirname}/../../data/movies.json`));

const hostIndex = (req, res) => {
  return res.render('index');
};

const notFound = (req, res) => {
  return res.status(404).render('notFound', {
    page: req.url,
  });
};

const getData = (req, res) => {
  const filtered = movies.filter(m => m.title === "Over the Hedge");

  return res.json(filtered);
};

module.exports = {
  index: hostIndex,
  notFound,
  getData,
};
