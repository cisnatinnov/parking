const express = require('express')
const app = express();
var _ = require('lodash');
var moment = require('moment');

// display cars
app.get('/', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else res.render('index', {title: 'Keuntungan Mobil', page: 'benefits/cars', session: req.session});
})

app.get('/lists', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else {
		req.getConnection((error, conn) => {
			if (error) throw error;
			conn.query('SELECT * FROM car_benefits ORDER BY id ASC', (err, rows) => {
				if (err) throw err;
				let data = [];
				_.forEach(rows, (o,i) => {
					data.push({
						no: i+1,
						id: o.id,
						car_number: o.car_number,
						rate: o.rate,
						total_rate: o.total_rate,
						persen: o.persen*100,
						benefits: o.benefits,
						status: o.status,
						create_at: moment(o.create_at).format('DD-MM-YYYY')
					})
				})
				res.json({
					data: data
				})
			})
		})
	}
})

app.post('/approve', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else {
		let lists = req.body.lists, date = moment().format('YYYY-MM-DD');
		req.getConnection((error, conn) => {
			if (error) throw error;
			_.forEach(lists, (value) => {
				conn.query('UPDATE car_benefits SET ? WHERE id = ' + value, { status: 'Disetujui', approved_at: date }, (err) => {
					if (err) throw err;
					res.json({
						result: 'success'
					})
				})
			})
		})
	}
})

module.exports = app;