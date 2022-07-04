const express = require('express')
const app = express();
var _ = require('lodash');
var moment = require('moment');

// Login Page
app.get('/', (req, res) => {
	res.render('login', {title: 'Login'});
})

app.post('/signin', (req, res) => {
  let user = req.body.user;
  user.password = Buffer.from(req.body.user.password).toString('base64');
  req.getConnection((error, conn) => {
    if (error) throw error;
    conn.query("SELECT * FROM users WHERE email = ?", [user.email], (err, rows) => {
      if (err) throw err;
      if (_.isEmpty(rows)) {
        res.json({
          result: 'error',
          message: 'Email tidak terdaftar'
        })
      }
      else {
        if (rows[0].password==user.password) {
          let access = rows[0].access_id;
          conn.query("SELECT * FROM access WHERE id = "+access, (errAcc, accesses) => {
            if (errAcc) throw errAcc;
            else {
              conn.query("SELECT * FROM persons WHERE user_id = ?", [rows[0].id], (err, results) => {
                if (err) throw err;
                req.session.id = rows[0].id;
                req.session.full_name = rows[0].full_name;
                req.session.email = rows[0].email;
                req.session.password = rows[0].password; 
                req.session.access_id = accesses[0].id;
                req.session.access = accesses[0].access;
                req.session.menu = _.split(accesses[0].menu, ',');
                req.session.first_name = results[0].first_name;
                req.session.middle_name = results[0].middle_name;
                req.session.last_name = results[0].last_name;
                req.session.birth_place = results[0].birth_place;
                req.session.birth_date = results[0].birth_date;
                req.session.address = results[0].address;
                req.session.village = results[0].village;
                req.session.district = results[0].district;
                req.session.city = results[0].city;
                req.session.province = results[0].province;
                req.session.pos_code = results[0].pos_code;
                req.session.created_at = results[0].created_at;
                req.session.since = moment(results[0].created_at).format('LLLL');
                res.json({
                  result: 'success',
                  message: 'Berhasil masuk'
                })
              })
            }
          })
        }
        else {
          res.json({
            result: 'error',
            message: 'Salah Password'
          })
        }
      }
    })
  })
})

app.get('/signout', (req, res)=>{
	req.session.destroy((err)=>{
		if (err) throw err
		res.redirect('/login');
	})
})

/** 
 * We assign app object to module.exports
 * 
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = app;