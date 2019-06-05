const db = require("../data/dbConfig.js");

module.exports = {
  get,
  getById,
  getCohortStudents,
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

function getCohortStudents(cohortId) {
  return db('students as s')
  .join('cohorts as c', 's.cohorts_id', 'c.id')
  .select('s.id', 's.name', 'c.id as cohortId', 'c.name as cohort')
  .where({ cohorts_id: cohortId })
}