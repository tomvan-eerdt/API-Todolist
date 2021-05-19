require('dotenv').config()
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

module.exports = {
    get_user_id: function get_user_id(conn, res, req) {
        conn.connection.query(
            'SELECT * FROM user WHERE id = ' + req.params.info + '',
            function(err, results, fields) {
                if (results.length == 0 || err || results == "undefined")
                    res.send(JSON.parse(JSON.stringify({msg:"internal server error"})))
                else
                    res.send(results)
            }
        );
    },
    get_user_email: function get_user_email(conn, res, req) {
        conn.connection.query(
            'SELECT * FROM user WHERE email = "' + req.params.info + '"',
            function(err, results, fields) {
                if (results.length == 0 || err || results == "undefined")
                    res.send(JSON.parse(JSON.stringify({msg:"internal server error"})))
                else
                    res.send(results)
            }
        );
    },
    get_user_info: function get_user_info(conn, res, data) {
        conn.connection.query(
            'SELECT * FROM user WHERE email="'+ data.user['e'] +'"',
            function(err, results, fields) {
                if (err)
                    res.send(JSON.parse(JSON.stringify({msg:"internal server error"})))
                else
                    res.send(results)
            }
        );
    },
    delete_user: function delete_user(conn, res, req) {
        conn.connection.query(
            'DELETE FROM user WHERE id = ' + req.params.id + '',
            function(err, results, fields) {
                if (results.affectedRows == 0 || err)
                    res.send(JSON.parse(JSON.stringify({msg:"internal server error"})))
                else
                    res.send(JSON.parse(JSON.stringify({msg:"succesfully deleted record number : "+ req.params.id +""})))
            }
        );
    },
};
