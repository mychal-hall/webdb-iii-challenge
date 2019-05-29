const db = require("../data/dbConfig.js");

module.exports = {
  get,
  getById,
  insert
};

function get() {
  return db("cohorts");
}

function getById(id) {
  return db("cohorts")
    .where({ id })
    .first();
}

function insert(cohort) {
  return db("cohorts")
    .insert(cohort)
    .then(ids => {
      return getById(ids[0]);
    });
}
