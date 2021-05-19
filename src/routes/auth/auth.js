require('dotenv').config()
var bodyParser = require('body-parser');
const query = require('./auth_querys.js');
var jwt = require('jsonwebtoken');
var jsonParser = bodyParser.json()

module.exports = {
    register_user: function register_user(app, conn) {
        app.post('/register', jsonParser,(req, res) => {
            const user = {
                e : req.body.email,
                p : req.body.password,
                n : req.body.name,
                f : req.body.firstname
            }
            for (const [key, value] of Object.entries(user)) {
                if (value == null)
                    res.send(JSON.parse(JSON.stringify({msg:"internal server error"})))
            }
            query.create_user(conn, user, res);
        });
    },
    login_user: function login_user(app, conn) {
        app.post('/login', jsonParser,(req, res) => {
            query.login_user(conn, res, req);
        });
    }
}