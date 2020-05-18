//  Data base
const mysql         = require('mysql');
const host          = 'localhost';
const user          = 'root';
const password      = 'root';
const database      = 'coins_catalog';
const pool          = mysql.createConnection({host, user, password, database});

module.exports = pool;