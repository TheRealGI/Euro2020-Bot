const knex = require('knex');

const dbConnection = knex({
    client: "sqlite3",
    connection: {
        filename: "./euro_2020.sqlite3"
    },
    useNullAsDefault: true
});

module.exports = {dbConnection};