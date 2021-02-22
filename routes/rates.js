const express = require('express')
const app = express();
var _ = require('lodash');
var moment = require('moment');

// display retes
app.get('/', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else res.render('index', {title: 'Akses', page: 'setting/retes', session: req.session});
})

module.exports = app;