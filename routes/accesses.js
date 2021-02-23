const express = require('express')
const app = express();
var _ = require('lodash');
const moment = require('moment');

// display access
app.get('/', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else res.render('index', {title: 'Akses', page: 'setting/accesses', session: req.session});
})

app.get('/lists', (req, res) => {
	req.getConnection((error, conn) => {
		if (error) throw error;
		conn.query("SELECT * FROM accesses ORDER BY id ASC", (err, rows) => {
			if (err) throw err;
			let data = [];
			_.forEach(rows, (o, i) => {
				data.push({
					no: i+1,
					id: o.id,
					access: o.access,
					menu: _.split(o.menu, ','),
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
			let data = req.body.access, label = req.body.label, query = '';
			data.menu = _.join(data.menu, ',');
			data.status = (data.status=='Aktif') ? '1': '0';
			if (label=='Tambah') {
				data.created_at = moment().format('YYYY-MM-DD HH:mm:ss');
				query = 'INSERT INTO accesses SET ?';
			}
			else {
				data.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
				query = 'UPDATE accesses SET ? WHERE id = '+data.id;
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
module.exports = app