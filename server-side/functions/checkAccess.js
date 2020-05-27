const pool = require('../modules/db_connect.js');

//  Check via token and call callback function 
function checkAccess(token, res, callback) {                     // role = 1 (administrator) role = 2 (customer) role = 3 (support)
    const result = { isOk: false, status: 403 };
    if(!token) {
        callback(result, res);
        return;
    }
    const findUserViaTokenScript = `SELECT * FROM users WHERE token='${token}'`;
    pool.query(findUserViaTokenScript, (err, data) => {
        if(!err) {
            if(data.length === 0) {
                callback(result, res);
                return;
            }
            const user = data[0];
            if(user.user_role !== 1 && user.user_role !== 2) {
                callback(result, res);
                return;
            }
            else {
                result.status   = 200;
                result.isOk     = true;
                result.id       = user.id;
                callback(result, res, user.user_role);
                return;
            }
        }
        else {
            result.status = 500;
            result.isOk = false;
            callback(result, res);
            return;
        }
    });
}

module.exports = checkAccess;