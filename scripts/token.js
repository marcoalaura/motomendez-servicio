const jwt = require("jwt-simple");
const config = require('../config/config');

function generar(dias, din) {
  var obj = {
    fecha: new Date()
  };
  if (!din) {
    obj.din = 0;
  }
  obj.fecha.setDate(obj.fecha.getDate() + parseInt(dias));
  return jwt.encode(JSON.stringify(obj), config.jwtSecret);
}

switch (process.argv.length) {
  case 3:
    console.log(generar(process.argv[2]));
    break;
  case 4:
    console.log(generar(process.argv[2], process.argv[3]));
    break;
  default:
    console.log(generar(365));
}
