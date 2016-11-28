const app = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

app()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(app.static(`${__dirname}/../../public`))
  .use(routes)
  .listen(3000, () => { process.stdout.write('\n Listening on port 3000'); });
