exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("cohorts", tbl => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.timestamps(true, true);
    })
    .createTable("students", tbl => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl
        .integer("cohorts_id")
        .notNullable()
        .references("id")
        .inTable("cohorts");
      tbl.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists("cohorts"),
    knex.schema.dropTableIfExists("students")
  ]);
};
