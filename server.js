var express = require('express'),
  app = express(),
  port = process.env.PORT || 3010,
	bodyParser = require('body-parser'),
	conn = require('./config/conn'),
	mysql = require('mysql'),
	myConnection  = require('express-myconnection'),
	dbOptions = {
    host: conn.database.host,
    user: conn.database.user,
    password: conn.database.password,
    port: conn.database.port, 
    database: conn.database.db
	},	
  port = process.env.PORT || conn.server.port;

/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */ 

app.use(myConnection(mysql, dbOptions, 'pool'))
	
/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 
const methodOverride = require('method-override');
/**
 * using custom logic to override method
 * 
 * there are other ways of overriding as well
 * like using header & using query value
 */ 
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// session library
var session = require('express-session');
app.use(session({ 
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1200000 }
}))

/**
 * setting up the templating view engine
 */ 
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
//routes
var home = require('./routes/home'),
login = require('./routes/login'),
users = require('./routes/users'),
accesses = require('./routes/accesses'),
rates = require('./routes/rates');

var cars = require('./routes/cars'),
car_benefits = require('./routes/car_benefits'),
car_reports = require('./routes/car_reports');

var motorcycles = require('./routes/motorcycles'),
motorcycle_benefits = require('./routes/motorcycle_benefits'),
motorcycle_reports = require('./routes/motorcycle_reports');
//home page
app.use('/', home)
//cars
app.use('/cars', cars);
app.use('/car_benefits', car_benefits);
app.use('/car_reports', car_reports);
//motorcycles
app.use('/motorcycles', motorcycles);
app.use('/motorcycle_benefits', motorcycle_benefits);
app.use('/motorcycle_reports', motorcycle_reports);

app.use('/login', login);

//setting
app.use('/users', users);
app.use('/accesses', accesses);
app.use('/rates', rates);

app.listen(port, () => {
	console.log('Server running at port'+port+': http://127.0.0.1:'+port+'/login');
});