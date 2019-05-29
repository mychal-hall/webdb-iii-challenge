const db = require("../data/dbConfig.js");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
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

function update(id, changes) {
  return db("cohorts")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("cohorts")
    .where("id", id)
    .del();
}
