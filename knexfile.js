// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/lambda.sqlite3"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    },
    useNullAsDefault: true
  }
};
