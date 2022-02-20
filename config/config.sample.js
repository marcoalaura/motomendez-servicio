module.exports = config;

var params = require('./config.json');

let env = process.env.NODE_ENV;
if (!env) {
  env = 'development';
}
if (!params.hasOwnProperty(env)) {
  env = 'development';
}
const config = {
  database: {
    "username": params[env].username,
    "password": params[env].password,
    "database": params[env].database,
    "params": {
      "host": params[env].host,
      "port": params[env].port,
      "dialect": params[env].dialect,
      "dialectOptions": {},
      "sync": { force: process.env.FORCE || true },
      "pool": {
        "max": params[env].pool.max,
        "min": params[env].pool.min,
        "idle": params[env].pool.idle
      }
    }
  },
  jwtSecret: 'AGETIC-2016',
  puerto: 4000
};

module.exports = config;