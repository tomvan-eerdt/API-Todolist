require('dotenv').config()
var bodyParser = require('body-parser');
const query = require('./user_query.js');
var jwt = require('jsonwebtoken');
var jsonParser = bodyParser.json()

function verifyToken(req, res, next) {
    const header = req.headers['token'];

    if (typeof header !== 'undefined') {
        req.token = header;
        next();
    } else
        res.send(JSON.parse(JSON.stringify({msg:" No token , authorization denied"})))
}

module.exports = {
    get_user: function get_user(app, conn) {
        app.get('/user', verifyToken, (req, res) => {
            jwt.verify(req.token, process.env.SECRET, (err, data) => {
                if (err)
                    res.send(JSON.parse(JSON.stringify({msg:"Token is not valid"})))
                else
                    query.get_user_info(conn, res, data);
            });
        });
    },
    find_user: function find_user(app, conn) {
        app.get('/user/:info', verifyToken, (req, res) => {
            String.prototype.isNumber = function(){return /^\d+$/.test(this);}
            jwt.verify(req.token, process.env.SECRET, (err, data) => {
                if (err)
                    res.send(JSON.parse(JSON.stringify({msg:"Token is not valid"})))
                else {
                    if (req.params.info.isNumber() == false)
                        query.get_user_email(conn, res, req);
                    else
                        query.get_user_id(conn, res, req);
                }
            });
        })
    },
    delete_user_w_id: function delete_user_w_id(app, conn) {
        app.delete('/user/:email', verifyToken, (req, res) => {
            jwt.verify(req.token, process.env.SECRET, (err, data) => {
                if (err)
                    res.send(JSON.parse(JSON.stringify({msg:"Token is not valid"})))
                else
                    query.delete_user(conn, res, req);
            });
        })
    }
};
