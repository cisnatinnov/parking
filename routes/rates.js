const express = require('express')
const app = express();
var _ = require('lodash');
var moment = require('moment');

// display rates
app.get('/', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else res.render('index', {title: 'Akses', page: 'setting/rates', session: req.session});
})

app.get('/lists', (req, res) => {
	req.getConnection((error, conn) => {
		if (error) throw error;
		conn.query("SELECT * FROM rates ORDER BY id ASC", (err, rows) => {
			if (err) throw err;
			let data = [];
			_.forEach(rows, (o, i) => {
				data.push({
					no: i+1,
					id: o.id,
					rate: o.rate,
					vehicle: o.vehicle,
					status: (o.status=='1') ? 'Aktif': 'Tidak Aktif',
					created_at: o.created_at,
					updated_at: o.updated_at
				})
			})
			res.json({
				data: data
			})
		})
	})
})

app.post('/save', (req, res) => {
	req.getConnection((error, conn) => {
		if (error) throw error;
		else {
			let data = req.body.rate, label = req.body.label, query = '';
			data.status = (data.status=='Aktif') ? '1': '0';
			if (label=='Tambah') {
				data.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
				conn.query('UPDATE rates SET status = 0 WHERE vehicle = '+data.vehicle, (err) => {
					if (err) throw err;
					else {
						query = 'INSERT INTO rates SET ?';
					}
				})
			}
			else {
				data.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
				query = 'UPDATE rates SET ? WHERE id = '+data.id;
			}
			conn.query(query, data, (err) => {
				if (err) throw err;
				else {
					res.json({
						result: 'success'
					})
				}
			});
		}
	})
})

app.get('/delete/:id', (req, res) => {
	req.getConnection((error, conn) => {
		if (error) throw error;
		conn.query('DELETE FROM rates WHERE id = '+req.params.id, (err) => {
			if (err) throw err;
			else {
				res.json({
					result: 'success'
				})
			}
		})
	})
})

app.get('/rate/:vehicle', (req, res) => {
	req.getConnection((error, conn) => {
		if (error) throw error;
		conn.query('SELECT rate FROM rates WHERE vehicle = ? AND status = 1', req.params.vehicle, (err, rows) => {
			if (err) throw err;
			else {
				res.json({
					rate: rows[0].rate
				})
			}
		})
	})
})
module.exports = app;