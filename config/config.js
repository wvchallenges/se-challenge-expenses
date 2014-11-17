var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    user = 'root',
    pw = process.env.ORM_PW ? (':' + process.env.ORM_PW) : '',
    dbServer = 'localhost',
    dbPath = 'mysql://' + user + pw + '@' + dbServer,
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'wave'
    },
    port: 3000,
    db: dbPath + '/wave_development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'wave'
    },
    port: 3000,
    db: dbPath + '/wave_test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'wave'
    },
    port: 3000,
    db: dbPath + '/wave_production'
  }
};

module.exports = config[env];
