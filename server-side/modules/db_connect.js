//  Data base
const mysql         = require('mysql');
const host          = process.env.DB_HOST || 'localhost';
const user          = process.env.DB_USER || 'root';
const password      = process.env.DB_PASS || 'root';
const database      = process.env.DB_NAME || 'coins_catalog';
const pool          = mysql.createConnection({host, user, password, database});

module.exports = pool;  