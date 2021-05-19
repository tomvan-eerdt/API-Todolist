require('dotenv').config()
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.on('error', function(err) {
  console.log("Error on database connection");
  process.exit(1)
})

module.exports = {connection};