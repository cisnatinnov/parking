const express = require('express')
const app = express();
var _ = require('lodash');
var moment = require('moment');

// display cars
app.get('/', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else res.render('index', {title: 'Keuntungan Motor', page: 'benefits/motorcycles', session: req.session});
})

app.get('/lists', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else {
    req.getConnection((error, conn) => {
      if (error) throw error;
      conn.query("SELECT * FROM motorcycle_benefits ORDER BY id ASC", (err, rows) => {
        if (err) throw err;
        let data = [];
        _.forEach(rows, (o,i) => {
          data.push(
            {
              no: i+1,
              motorcycle_id: o.motorcycle_id,
              motorcycle_number: o.motorcycle_number,
              id: o.id,
              persen: o.persen,
              rate: o.rate,
              total_rate: o.total_rate,
              benefits: o.benefits,
              status: o.status,
              create_at: moment(o.create_at).format('DD-MM-YYYY')
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
app.post('/approve', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else {
    let lists = req.body.lists, date = moment().format('YYYY-MM-DD');
    req.getConnection((error, conn) => {
      if (error) throw error;
      _.forEach(lists, (value) => {
        conn.query('UPDATE motorcycle_benefits SET ? WHERE id = ' + value, { status: 'Disetujui', approved_at: date }, (err) => {
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