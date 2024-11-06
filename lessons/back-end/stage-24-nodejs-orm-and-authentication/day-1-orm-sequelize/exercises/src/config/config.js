require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.MYSQL_USER || "root",
    "password": process.env.MYSQL_PASS || null,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST || "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.MYSQL_USER || "root",
    "password": process.env.MYSQL_PASS || null,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST || "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
