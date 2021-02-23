const express = require('express')
const app = express();
var _ = require('lodash');
var moment = require('moment');

// display users
app.get('/', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else res.render('index', {title: 'Pengguna', page: 'setting/users', session: req.session});
})

app.get('/lists', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else {
		req.getConnection((error, conn) => {
			if (error) throw error;
			conn.query('SELECT * FROM users ORDER BY id ASC', (err, rows) => {
				if (err) throw err;
				let data = [];
				_.forEach(rows, (o,i) => {
					data.push(
						{
							access_id: o.access_id,
							full_name: o.full_name,
							no: i+1,
							id: o.id,
							email: o.email,
							password: o.password,
							create_at: moment(o.create_at).format('DD-MM-YYYY'),
							update_at: moment(o.update_at).format('DD-MM-YYYY')
						}
					)
				})
				res.json({
					data: data
				})
			})
		})
	}
})

app.post('/save', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else {
		req.getConnection((error, conn) => {
			if (error) throw error;
			else {
				let user = req.body.userDetail, date = req.body.date, person = req.body.personDetail;
				user.password = Buffer.from(req.body.userDetail.password).toString('base64');
	
				if (req.body.label === 'Tambah') {
					let insertUser = Object.assign(user, { create_at: date });
					conn.query('INSERT INTO users SET ?', insertUser, (errUser, result) => {
						if (errUser) throw errUser;
						else {
							let insertPerson = Object.assign(person, { user_id: result.insertId, create_at: date });
							conn.query('INSERT INTO persons SET ?', insertPerson, (errPerson) => {
								if (errPerson) throw errPerson;
								else {
									res.json({
										result: 'success'
									})								
								}
							})
						}
					})
				}
				else {
					let updateUser = Object.assign(user, { update_at: date });
					conn.query('UPDATE users SET ? WHERE id = ' + user.id, updateUser, (errUser) => {
						if (errUser) throw errUser;
						else {
							let updatePerson = Object.assign(person, { update_at: date });
							conn.query('UPDATE persons SET ? WHERE user_id = ' + user.id, updatePerson, (errPerson) => {
								if (errPerson) throw errPerson;
								else {
									res.json({
										result: 'success'
									})								
								}
							})
						}
					})
				}
			}
		})
	}
})

app.get('/getPerson/:user_id', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else {
		req.getConnection((error, conn) => {
			if (error) throw error;
			conn.query('SELECT * FROM persons WHERE user_id = '+req.params.user_id, (err, rows) => {
				if (err) throw err;
				else {
					let data = Object.assign(rows[0], { birth_date: moment(rows[0].birth_date).format('YYYY-MM-DD') });
					res.json({
						data: data
					})
				}
			})
		})
	}
})

app.get('/delete/:id', (req, res) => {
	req.getConnection((error, conn) => {
		if (error) throw error;
		conn.query('DELETE FROM users WHERE id = '+req.params.id, (err) => {
			if (err) throw err;
			else {
				conn.query('DELETE FROM persons WHERE user_id = '+req.params.id, (errPerson) => {
					if (errPerson) throw errPerson;
					res.json({
						result: 'success'
					})
				})
			}
		})
	})
})
module.exports = app;