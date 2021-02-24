const express = require('express')
const app = express();
var _ = require('lodash');
var moment = require('moment');

// display motorcycles
app.get('/', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else res.render('index', {title: 'Motor', page: 'vehicles/motorcycles', session: req.session});
})
app.get('/lists', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else {
		req.getConnection((error, conn) => {
			if (error) throw error;
			conn.query('SELECT * FROM motorcycles ORDER BY id ASC', (err, rows) => {
				if (err) throw err;
				let data = [];
				_.forEach(rows, (o,i) => {
					data.push(
						{
							no: i+1,
							id: o.id,
							type: o.type,
							merk: o.merk,
							number: o.number,
							in: o.in,
							out: o.out,
							rate: o.rate,
							status: o.status,
							create_at: moment(o.create_at).format('DD-MM-YYYY'),
							update_at: moment(o.update_at).format('DD-MM-YYYY')
						}
					);
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
		let detailMotor = req.body.detailMotor, label = req.body.label,
		time_in = req.body.time_in, time_out = req.body.time_out, date = req.body.date, rate = req.body.rate,
		outRate = req.body.outRate, total_rate = req.body.total_rate, persen = req.body.persen, benefits = req.body.benefits;

		req.getConnection((error, conn) => {
			if (error) throw error;
			else {
				if (label==='Masuk') {
					let insertMotor = Object.assign(detailMotor, { in: time_in, status: label, create_at: date, rate: rate });
					conn.query('INSERT INTO motorcycles SET ?', insertMotor, (err, result) => {
						if (err) throw err;
						res.json({
							result: 'success'
						})
					})
				}
				else if (label==='Edit') {
					let updateMotor = { in: time_in, status: 'Masuk', update_at: date, rate: rate };
					conn.query('UPDATE motorcycles SET ? WHERE id = ' + detailMotor.id, updateMotor, (err) => {
						if (err) throw err;
						res.json({
							result: 'success'
						})
					})
				}
				else {
					let updateMotor = { out: time_out, status: label, update_at: date, rate: rate };
					conn.query('UPDATE motorcycles SET ? WHERE id = ' + detailMotor.id, updateMotor, (err) => {
						if (err) throw err;
						let insertBenefits = { motorcycle_id: detailMotor.id, motorcycle_number: detailMotor.number, persen: persen,
						rate: rate, out_rate: outRate, total_rate: total_rate, benefit: benefits, status: 'Belum disetujui', create_at: date };
						conn.query('INSERT INTO motorcycle_benefits SET ?', insertBenefits, (errInsert) => {
							if (errInsert) throw errInsert;
							res.json({
								result: 'success'
							})
						})
					})				
				}
			}
		})
	}
})

module.exports = app;