const express = require('express')
const conn = require('./config/db.js');
const user = require('./routes/user/user.js');
const auth = require('./routes/auth/auth.js');
const app = express()
const port = 3000

user.find_user(app,conn);

user.get_user(app,conn);

auth.register_user(app,conn);

auth.login_user(app,conn);

user.delete_user_w_id(app, conn);

app.listen(port, () => {
    console.log("server started on port: "+ port+"");
})
