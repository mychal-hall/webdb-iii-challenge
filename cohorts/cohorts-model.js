const db = require("../data/dbConfig.js");

module.exports = {
  get,
  getById
};

function get() {
  return db("cohorts");
}

function getById(id) {
  return db("cohorts")
  .where({ id })
  .first();
}