const express = require('express')
const app = express();
var _ = require('lodash');
var moment = require('moment');

// display motorcycles
app.get('/', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else res.render('index', {title: 'Laporan Motor', page: 'reports/motorcycles', session: req.session});
})
app.post('/lists', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else {
    req.getConnection((error, conn) => {
      if (error) throw error;
      let query = "SELECT * FROM motorcycle_benefits WHERE status = 'Disetujui'";
      if (!_.isEmpty(req.body.startDate) && _.isEmpty(req.body.endDate)) query += " AND approved_at >= '"+req.body.startDate+"'";
      else if (_.isEmpty(req.body.startDate) && !_.isEmpty(req.body.endDate)) query += " AND approved_at <= '"+req.body.endDate+"'";
      else if (!_.isEmpty(req.body.startDate) && !_.isEmpty(req.body.endDate)) {
        if (req.body.startDate === req.body.endDate) query += " AND approved_at = '"+req.body.startDate+"'";
        else query += " AND approved_at >= "+req.body.startDate+" AND approved_at <= '"+req.body.endDate+"'";
      }
      
      conn.query(query, (err, rows) => {
        if (err) throw err;
        else {
          let querySum = "SELECT SUM(benefit) AS benefit FROM motorcycle_benefits WHERE status = 'Disetujui'";
          if (!_.isEmpty(req.body.startDate) && _.isEmpty(req.body.endDate)) query += " AND approved_at >= '"+req.body.startDate+"'";
          else if (_.isEmpty(req.body.startDate) && !_.isEmpty(req.body.endDate)) query += " AND approved_at <= '"+req.body.endDate+"'";
          else if (!_.isEmpty(req.body.startDate) && !_.isEmpty(req.body.endDate)) {
            if (req.body.startDate === req.body.endDate) query += " AND approved_at = '"+req.body.startDate+"'";
            else query += " AND approved_at >= "+req.body.startDate+" AND approved_at <= '"+req.body.endDate+"'";
          }
          
          conn.query(querySum, (errSum, results) => {
            if (err) throw errSum;
            let data = [];
            _.forEach(rows, (o,i) => {
              data.push(
                {
                  no: i+1,
                  motorcycle_id: o.motorcycle_id,
                  motorcycle_number: o.motorcycle_number,
                  id: o.id,
                  persen: o.persen*100,
                  rate: o.rate,
                  total_rate: o.total_rate,
                  benefit: o.benefit,
                  status: o.status,
                  create_at: moment(o.create_at).format('DD-MM-YYYY')
                }
              )
            })
            res.json({
              data: data,
              benefit: results[0].benefit
            })
          })
        }
      })
    })
  }
})
app.get('/getMotorCycle/:id', (req, res) => {
	if (!req.session.email) res.redirect('/login');
	else {
    req.getConnection((error, conn) => {
      if (error) throw error;
      conn.query('SELECT * FROM motorcycles WHERE id = '+req.params.id, (err, rows) => {
        if (err) throw err;
        else {
          res.json({
            data: rows[0]
          })
        }
      })
    })
  }
})
module.exports = app;