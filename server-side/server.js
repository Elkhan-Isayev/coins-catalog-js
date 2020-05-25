//  Libraries
const express   = require('express');
const bcrypt    = require('bcrypt');
const cors      = require('cors');
const path      = require('path');
const multer    = require('multer');
const fs        = require('fs');        

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

//  Check access via token
app.get('/sign-in/admin-panel/:id', (req, res) => {
    const token = req.params.id;
    checkAccess(token, 1, res, (result, res) => {        
        res.sendStatus(result.status);
        return;
    });
});

//  Create token if exist or update 
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

//  Get and filter coins by params
app.get('/coins', (req, res) => {
    const {type, searchBarMainInput, priceFrom, priceTo, yearFrom, yearTo, issuingCountry, composition, quality} = req.query;
    //  Filter by..
    const byTypeInfo            = type ? `coin_type='${type}'` : 'id > 0';
    const byNameOrDescription   = searchBarMainInput ? 
    `AND coin_name LIKE '%${searchBarMainInput}%' 
        OR short_description LIKE '%${searchBarMainInput}%' 
        OR full_description LIKE '%${searchBarMainInput}%'` 
    : ``;
    const byPriceFrom           = priceFrom ? `AND price>=${+priceFrom}` : ``;
    const byPriceTo             = priceTo ? `AND price<=${+priceTo}` : ``;
    const byYearFrom            = yearFrom ? `AND coin_year<=${+yearFrom}` : ``;
    const byYearTo              = yearTo ?  `AND coin_year>=${+yearTo}` : ``;
    const byIssuingCountry      = issuingCountry ? `AND issuing_country='${issuingCountry}'` : ``;
    const byComposition         = composition ? `AND composition='${composition}'` : ``;
    const byQuality             = quality ? `AND quality='${quality}'` : ``;
    //  Order by..
    const orderBy               = searchBarMainInput ? 
    `ORDER BY CASE 
        WHEN coin_name='${searchBarMainInput}' THEN 1 
        WHEN short_description='${searchBarMainInput}' THEN 2 
        WHEN full_description='${searchBarMainInput}' THEN 3 END` 
    : ``;
    //  Total script
    const getCoinsScript        = `SELECT id, coin_name, short_description, obverse_path FROM coins 
    WHERE(${byTypeInfo} ${byNameOrDescription} ${byPriceFrom} ${byPriceTo} ${byYearFrom} ${byYearTo} ${byIssuingCountry} ${byComposition} ${byQuality}) ${orderBy}`; 
    pool.query(getCoinsScript, (err, data) => {
        if(!err) {
            res.status(200).json(data);
        }
        else {
            res.sendStatus(500);
        }
    });
});

//  Get coin full info by id
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

//  Get length for pagination(dv level) if it will be created 
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

//  Delete item via check token
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


//  Get coin image
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
        if(fs.existsSync(`./assets/public/coins/${coin}`)) {
            res.sendFile(coin, options);
        }
        else {
            res.sendFile(notFoundImgPath, options);
        }
    }
    catch(err) {
        console.log(err);
        res.sendStatus(404);
    }    
});

//  Get all metalls
app.get('/compositions', (req, res) => {
    const getScript = `SELECT * FROM compositions`;
    pool.query(getScript, (err, data) => {
        if(!err) {
            if(data.length > 0) {
                res.status(200).json(data);
            }
            else {
                res.sendStatus(404);
            }
        }
        else {
            res.sendStatus(500);
        }
    });
});


//  Get all countries 
app.get('/countries', (req, res) => {
    const getScript = `SELECT * FROM countries`;
    pool.query(getScript, (err, data) => {
        if(!err) {
            if(data.length > 0) {
                res.status(200).json(data);
            }
            else {
                res.sendStatus(404);
            }
        }
        else {
            res.sendStatus(500);
        }
    });
});

//  Download coin image
app.get('/img/download/coins/:coin', (req, res) => {
    const coin = req.params.coin;
    const file = `${__dirname}/assets/public/coins/${coin}`;
    res.download(file);
});

//  Create new coin 
app.post('/coins', upload.fields([{name: 'obverse'}, {name: 'reverse'}]), (req, res) => {
    const obverseFileName = req.files.obverse[0].filename;
    const reverseFileName = req.files.reverse[0].filename;
    const {
        coin_name,
        short_description,
        full_description,
        issuing_country,
        composition,
        quality,
        denomination,
        coin_year,
        weight,
        price,
        coin_type,
    } = req.body;

    const insertScript = `
    INSERT INTO coins 
    (coin_name, short_description, full_description, issuing_country, composition, quality, denomination, coin_year, weight, price, obverse_path, reverse_path, coin_type) 
    VALUES
    (
        '${coin_name}', 
        '${short_description}',
        '${full_description}',
        '${issuing_country}',
        '${composition}',
        '${quality}',
        '${denomination}',
        ${coin_year},
        ${weight},
        ${price},
        '${obverseFileName}',
        '${reverseFileName}',
        ${coin_type}
    );`;
    pool.query(insertScript, (err, data) => {
        if(!err) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(500);
        }
    });
});

//  Update selected coin
app.put('/coins/:id', upload.fields([{name: 'obverse'}, {name: 'reverse'}]), (req, res) => {

    

    const id = +req.params.id;
    let obversePath, reversePath;
    const {
        coin_name,
        short_description,
        full_description,
        issuing_country,
        composition,
        quality,
        denomination,
        coin_year,
        weight,
        price,
        coin_type,
    } = req.body;


    if(req.body.editObverseStart && req.body.editReverseStart) {
        obversePath = req.body.editObverseStart;
        reversePath = req.body.editReverseStart;
    }
    else {
        obversePath = req.files.obverse[0].filename;
        reversePath = req.files.reverse[0].filename;
    }

    const updateScript = `
    UPDATE coins SET 
    coin_name='${coin_name}',
    short_description='${short_description}',
    full_description='${full_description}', 
    issuing_country='${issuing_country}', 
    composition='${composition}', 
    quality='${quality}', 
    denomination='${denomination}', 
    coin_year=${coin_year}, 
    weight=${weight},
    price=${price}, 
    obverse_path='${obversePath}', 
    reverse_path='${reversePath}',
    coin_type=${coin_type}
    WHERE id=${id}`;

    pool.query(updateScript, (err, data) => {
        if(!err) {
            res.sendStatus(200);
        }
        else {
            console.log(err);
            res.sendStatus(500);
        }
    });

});

app.listen(port, () => {    console.log("Server is running!...");   });