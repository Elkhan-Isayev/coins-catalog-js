//  Libraries
const express   = require('express');
const bcrypt    = require('bcrypt');
const cors      = require('cors');
const path      = require('path');
const multer    = require('multer');

//  Modules
const pool = require('./modules/db_connect');

//  Constants
const app       = express();
const port      = process.env.PORT || 3010;
const storage   = multer.diskStorage({
    destination: './assets/public/coins',
    filename: (req, file, cb) => {
        return cb(
            null, 
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        )
    }
});  
const upload    = multer({storage});

//  Functions
const randomStringGenerator = require('./functions/randomStringGenerator.js');
const reverseString         = require('./functions/reverseString.js');
const checkAccess           = require('./functions/checkAccess.js');

//  Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

//  Routes
app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.get('/sign-in/admin-panel/:id', (req, res) => {
    const token = req.params.id;
    checkAccess(token, 1, res, (result, res) => {        
        res.sendStatus(result.status);
        return;
    });
});

app.post('/sign-in', (req, res) => {
    const {login, password} = req.body;
    const checkUserScript = `SELECT * FROM users WHERE user_name='${login}'`;
    pool.query(checkUserScript, (err, data) => {
        if(!err) {
            if(data.length === 0) {
                res.status(403).json({loginError: true});
                return;
            }
            const {id, password_salt, password_hash, user_role} = data[0];
            if(bcrypt.hashSync(password, password_salt) === password_hash) {
                const token = randomStringGenerator() + reverseString(login);
                const insertTokenScript = `UPDATE users SET token='${token}' WHERE id=${id}`;
                pool.query(insertTokenScript, (err, data) => {
                    if(!err) {
                        res.status(201).json({token, user_role});
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

app.get('/coins', (req, res) => {
    //  localhost:3010/coins/?count=10&offset=3&filter={}
    const offset    = req.query.offset ? parseInt(req.query.offset) : 0;
    const count     = req.query.count ? parseInt(req.query.count) : 10;    
    const filter    = req.query.filter;

    if(filter===undefined) {
        const getCoinsScript = `SELECT id, coin_name, short_description, obverse_path FROM coins LIMIT ${offset}, ${count}`; 
        pool.query(getCoinsScript, (err, data) => {
            if(!err) {
                // res.status(200).json(data.slice(offset, offset + count));
                res.status(200).json(data);
            }
            else {
                res.sendStatus(500);
                return;
            }
        });
    }
    else {
        // ////......
        res.sendStatus(200);
    }
});

app.get('/coins/:id', (req, res) => {
    const id = +req.params.id;
    const getCoinsScript = `SELECT * FROM coins WHERE id=${id}`;
    pool.query(getCoinsScript, (err, data) => {
        if(!err) {
            if(data.length === 0) {
                res.sendStatus(404);
                return;
            }
            res.status(200).json(data);
        }
        else {
            res.sendStatus(500);
            return;
        }
    });
});

app.get('/coins-length', (req, res) => {
    
    const coinsLengthScript = `SELECT count(*) AS length FROM coins`;
    pool.query(coinsLengthScript, (err, data) => {
        if(!err) {
            res.status(200).json(data[0]);
        }
        else {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

app.delete('/coins/:id', (req, res) => {         // add check access via token
    const id = +req.params.id;
    const {token} = req.body;
    checkAccess(token, 1, res, (result, res) => {        
        if(result.isOk) {
            const deleteScript = `DELETE FROM coins WHERE id=?`;
            pool.query(deleteScript, id, (err, data) => {
                if(!err) {
                    res.status(200).json(data);
                }
                else {
                    res.status(500);
                }
            });
        }
        else {
            res.sendStatus(result.status);
        }
        return;
    });
});



app.get('/img/coins/:coin', (req, res) => {   
    const options = { 
        root: path.join(__dirname, '/assets/public/coins'),
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    const coin = req.params.coin;
    const notFoundImgPath = 'not-found.png';
    try {
        res.sendFile(coin, options);
    }
    catch(err) {
        res.sendFile(notFoundImgPath, options, (secondErr) => {                 // Not work
            console.log(secondErr);
            res.sendStatus(404);
        });
    }    
});

app.get('/img/download/coins/:coin', (req, res) => {
    const coin = req.params.coin;
    const file = `${__dirname}/assets/public/coins/${coin}`;
    res.download(file);
});

app.post('/coins', upload.fields([{name: 'obverse'}, {name: 'reverse'}]), (req, res) => {
    const obverseFileName = req.files.obverse[0].filename;
    const reverseFileName = req.files.reverse[0].filename;
    

    
    res.sendStatus(200);
});

app.put('/coins/:id', (req, res) => {

});




app.listen(port, () => {    console.log("Server is running!...");   });