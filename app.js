var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var jwt = require("jwt-simple");

var index = require('./routes/index');
var pcd = require('./routes/pcd');
var dinamico = require('./routes/dinamico');
var pcd2 = require('./routes/pcd2');

var app = express();

app.config = require('./config/config');

/**
 * Cargando modelos
 */
var sequelize = new Sequelize(app.config.database.database, app.config.database.username, app.config.database.password, app.config.database.params);

var db = {
  sequelize,
  Sequelize,
  models: []
};

const registro = sequelize.import('./models/registro.js');
db.models['registro'] = registro;
const certificado = sequelize.import('./models/certificado.js');
db.models['certificado'] = certificado;
const acudiente = sequelize.import('./models/acudiente.js');
db.models['acudiente'] = acudiente;

// Asociaciones
registro.associate(db.models);
certificado.associate(db.models);
acudiente.associate(db.models);

app.db = db;

if (process.env.FORCE || false) {
  app.db.sequelize.sync().done(() => {
    console.log('------------BASE DE DATOS CREADA--------------');
    process.exit(0);
  });
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v2', function (req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      const tokenDecoded = jwt.decode(token, app.config.jwtSecret);
      if (tokenDecoded) {
        const tokenParsed = JSON.parse(tokenDecoded);
        const fecha = new Date(tokenParsed.fecha);
        if (fecha.getTime() > new Date().getTime()) {
          if (req.url.startsWith('/dinamico/') && tokenParsed.din === 0) {
            return res.status(401).send({
              finalizado: false,
              mensaje: 'No autorizado.',
              datos: {}
            });
          }
          next();
        } else {
          return res.status(401).send({
            finalizado: false,
            mensaje: 'Token expirado.',
            datos: {}
          });
        }
      } else {
        return res.status(401).send({
          finalizado: false,
          mensaje: 'No autorizado.',
          datos: {}
        });
      }
    } else {
      return res.status(401).send({
        finalizado: false,
        mensaje: 'No autorizado.',
        datos: {}
      });
    }
  } else {
    return res.status(401).send({
      finalizado: false,
      mensaje: 'No autorizado.',
      datos: {}
    });
  }
});

app.use('/api/v2/pcd', pcd);
app.use('/api/v2/dinamico', dinamico);
app.use('/api/v2', index);
app.use('/api/v2/pcd2', pcd2);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
