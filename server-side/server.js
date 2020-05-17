// Lib imports
const express   = require('express');
const app       = express();
const bcrypt    = require('bcrypt');
const cors      = require('cors');
const port      = process.env.PORT || 3010;

// Functions
const randomStringGenerator = require('./functions/randomStringGenerator.js');
const reverseString         = require('./functions/reverseString.js');

// Db connect 
const mysql         = require('mysql');
const host          = 'localhost';
const user          = 'root';
const password      = 'root';
const database      = 'coins_catalog';
const pool          = mysql.createConnection({host, user, password, database});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200);
});



app.post('/signin', (req, res) => {
    console.log(req.body)
    const {login, password} = req.body;
    const checkUserScript = `SELECT * FROM users WHERE user_name='${login}'`;
    pool.query(checkUserScript, (err, data) => {
        if(!err) {
            if(data.length === 0) {
                res.status(403).json({loginError: true});
                return;
            }
            const {id, password_salt, password_hash} = data[0];
            if(bcrypt.hashSync(password, password_salt) === password_hash) {
                const token = randomStringGenerator() + reverseString(login);
                const insertTokenScript = `UPDATE users SET token='${token}' WHERE id=${id}`;
                pool.query(insertTokenScript, (err, data) => {
                    if(!err) {
                        res.status(201).json({token});
                    }
                    else {
                        res.status(500).json({serverError: true});
                        return;
                    }
                });
            }
            else {
                res.status(403).json({passwordError: true});
                return;
            }
        }
        else {
            res.status(500).json({serverError: true});
            return;
        }
    });
});

// app.post('/registration', (req, res) => {
//     const {login, password} = req.body;
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt);
//     const insertUserScript = `INSERT INTO users(user_name, password_hash, password_salt, user_role) VALUES ('${login}', '${hash}', '${salt}', ${1});`;
//     pool.query(insertUserScript, (err, data) => {
//         if (!err) {
//             console.log(data);
//             res.status(200);
//         }
//         else {

//             res.status(404);
//         }   
//     });
// });

app.listen(port, () => {    console.log("Server is running!...");   });