const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'postgres',
      password : '96102047',
      database : 'knexjs'
    }
  });

  module.exports = knex;