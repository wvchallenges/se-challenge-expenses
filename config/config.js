var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'wave'
    },
    port: 3000,
    db: 'mysql://root:9uykn6QC@localhost/wave_development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'wave'
    },
    port: 3000,
    db: 'mysql://root:9uykn6QC@localhost/wave_test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'wave'
    },
    port: 3000,
    db: 'mysql://root:9uykn6QC@localhost/wave_production'
  }
};

module.exports = config[env];
