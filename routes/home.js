const express = require('express')
const app = express();
var _ = require('lodash');

// display home page
app.get('/', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else res.render('index', {title: 'Beranda', page: 'home', session: req.session});
})

app.get('/kendaraan', (req, res) => {
	req.getConnection((error, conn) => {
		if(error) throw error
		else {
			conn.query("SELECT COUNT(id) AS car FROM cars", (err, cars) => {
				if(err) throw err
				else {
					conn.query("SELECT COUNT(id) AS motorcycle FROM motorcycles", (err, motorcycles) => {
						if(err) throw err
						else {
							res.json({
								cars: cars[0].car,
								motorcycles: motorcycles[0].motorcycle
							})
						}
					})
				}
			})
		}
	})
})

app.get('/type', (req, res) => {
	req.getConnection((error, conn) => {
		if(error) throw error
		else {
			conn.query("SELECT COUNT(id) AS car, type FROM cars GROUP BY type", (err, cars) => {
				if(err) throw err
				else {
					conn.query("SELECT COUNT(id) AS motorcycle, type FROM motorcycles GROUP BY type", (err, motorcycles) => {
						if(err) throw err
						else {
							let car = [], motorcycle = [];
							_.forEach(cars, (o) => {
								car.push({
									name: o.type,
									y: o.car
								})
							})
							_.forEach(motorcycles, (o) => {
								motorcycle.push({
									name: o.type,
									y: o.motorcycle,
								})
							})
							res.json({
								data: {
									car: car,
									motorcycle: motorcycle
								}
							})
						}
					})
				}
			})
		}
	})
})

app.get('/status', (req, res) => {
	req.getConnection((error, conn) => {
		if(error) throw error
		else {
			conn.query("SELECT COUNT(id) AS car, status FROM cars GROUP BY status", (err, cars) => {
				if(err) throw err
				else {
					conn.query("SELECT COUNT(id) AS motorcycle, status FROM motorcycles GROUP BY status", (err, motorcycles) => {
						if(err) throw err
						else {
							let car = [], motorcycle = [];
							_.forEach(cars, (o) => {
								car.push({
									status: o.status,
									car: o.car
								})
							})
							_.forEach(motorcycles, (o) => {
								motorcycle.push({
									status: o.status,
									motorcycle: o.motorcycle
								})
							})
							res.json({
								cars: car,
								motorcycles: motorcycle
							})
						}
					})
				}
			})
		}
	})
})
module.exports = app;