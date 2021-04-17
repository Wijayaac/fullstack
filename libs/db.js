const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "phpmyadmin",
    password: "ac",
    database: "fullstacknextjs",
  },
});

export default knex;
