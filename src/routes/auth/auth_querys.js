require('dotenv').config()
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

module.exports = {
    create_user: function create_user(conn, user, res) {
        conn.connection.query(
            'INSERT INTO user (email, password, name, firstname) VALUES ("'+ user.e +'", "'+ bcrypt.hashSync(user.p, 8) +'", "'+ user.n +'", "'+ user.f +'")',
            function(err, results, fields) {
                if (err)
                    res.send(JSON.parse(JSON.stringify({msg:"account already exists"})))
                jwt.sign ({user}, process.env.SECRET, (err, token) => {
                    if (err)
                        res.send(JSON.parse(JSON.stringify({msg:"internal server error"})))
                    else
                        res.send(JSON.parse(JSON.stringify({token:token})))
                });
            }
        );
    },
    login_user: function login_user(conn, res, req) {
        conn.connection.query(
            'SELECT * FROM user WHERE email="'+ req.body.email +'"',
            function(err, results, fields) {
                bcrypt.compare(req.body.password, results[0].password, function(err, result) {
                    if (err || result == false)
                        res.send(JSON.parse(JSON.stringify({msg: "Invalid Credentials"})))
                    else {
                        const user = {
                            e : req.body.email,
                            p : req.body.password,
                            n : results[0].name,
                            f : results[0].firstname
                        }
                        jwt.sign ({user}, process.env.SECRET, (err, token) => {
                            if (err)
                                res.send(JSON.parse(JSON.stringify({msg:"internal server error"})))
                            else
                                res.send(JSON.parse(JSON.stringify({token: token})))
                        });
                    }
                });
            }
        );
    }
}