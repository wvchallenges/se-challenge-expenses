const path = require('path')
const knex = require('knex')
const log = require('pino')()
const convert = require('koa-convert')
const Koa = require('koa')
const koaBody = require('koa-body')()

const Container = require('./server/library/container')
const Database = require('./server/library/database')
const Cache = require('./server/library/cache')
const MemoryCache = require('./server/library/memory-cache')

// Setup Container
const container = new Container(log.debug.bind(log))
container.set('container', container)
container.set('log', log)
container.set('db', new Database(knex(require('./knexfile'))))
container.set('cache', new Cache(new MemoryCache()))
container.load(require('./server/helpers/csv'))
container.load(require('./server/repositories/taxes'))
container.load(require('./server/repositories/employees'))
container.load(require('./server/repositories/expense_categories'))
container.load(require('./server/repositories/expenses'))
container.load(require('./server/services/import'))
container.load(require('./server/services/report'))

// Setup Routes
const router = require('koa-router')()

const reportController = container.create(require('./server/controllers/report'))
router.get('/', reportController.report)

const importController = container.create(require('./server/controllers/import'))
router.get('/import', importController.import)
router.post('/import', koaBody, importController.import)

// Setup Server
const staticPath = path.join(__dirname, 'static')
const app = new Koa()
app.proxy = true // Allow reverse proxing
app.use(require('koa2-handlebars')({
  extension: '.hbs',
  defaultLayout: 'layout',
  viewPath: path.join(__dirname, 'views'),
  layoutPath: path.join(__dirname, 'views'),
  partialPath: path.join(__dirname, 'views', 'partials')
})) // Setup handlebars for views
app.use(require('koa-static')('static', staticPath)) // Serve static files
app.use(require('./server/middlewares/force-https')) // Force HTTPS in prod
app.use(require('./server/middlewares/request-logger')(log)) // Log requests
app.use(router.routes()) // Router
app.use(router.allowedMethods()) // Unhandled method router middleware
app.use((ctx) => ctx.render('not-found', {layout: 'layout-error'})) // Handle 404s

if (!module.parent) {
  const port = process.env.PORT || 8000
  app.listen(port)
  log.info('started listening on port ' + port)
}
