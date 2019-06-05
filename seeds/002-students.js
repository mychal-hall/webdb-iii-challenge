
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Billy', cohorts_id: '3'},
        {name: 'Bob', cohorts_id: '2'},
        {name: 'Thornton', cohorts_id: '1'}
      ]);
    });
};
