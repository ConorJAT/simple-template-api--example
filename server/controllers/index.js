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
  return res.json(movies);
};

const hostResults = (req, res) => {
  if (!req.query.title && !req.query.year && !req.query.starring) {
    return res.status(400).json({
      message: "Must provide at least one search parameter.",
      id: "resultsMissingTerm",
    });
  }
  
  let results = movies;

  if (req.query.title) {
    results = results.filter(m => 
      m.title.toLowerCase()
      .includes(req.query.title.toLowerCase())
    );
  }

  if (req.query.year) {
    const year = parseInt(req.query.year, 10);
    results = results.filter(m => m.year === year);
  }

  if (req.query.starring) {
    results = results.filter(m => m.cast.includes(req.query.starring));
  }

  return res.render('results', {
    movies: results,
    search: req.query,
  });
};

module.exports = {
  index: hostIndex,
  notFound,
  getData,
  results: hostResults,
};
