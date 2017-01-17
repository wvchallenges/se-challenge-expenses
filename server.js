var fs = require('fs')
var path = require('path')
var http = require('http')
var merry = require('merry')
var bankai = require('bankai')

var env = merry.env({PORT: 8000})
var production = env.NODE_ENV === 'production'
var app = merry()

app.router([
  // Static assets
  ['/', serveStaticFile('index.html', 'text/html')],
  ['/app.js', serveClientJs],
  ['/tachyons.min.css', serveStaticFile('tachyons.min.css', 'text/css')],

  // API
  ['/upload', {post: handleUpload}],

  // Error and Not found handlers
  ['/404', serveStaticFile('not-found.html', 'text/html')]
])

http.createServer(app.start()).listen(env.PORT)
app.log.info('started listening on port ' + env.PORT)

function handleUpload (req, res, ctx, done) {
  done(merry.error({statusCode: 400}))
  done(null, 'hello world')
}

function serveClientJs (req, res, ctx, done) {
  var clientPath = path.join(__dirname, 'client', 'app.js')
  var assets = bankai(clientPath, {optimize: production, cssDisabled: true})
  done(null, assets.js(req, res))
}

function serveStaticFile (filename, contentType) {
  return function (req, res, ctx, done) {
    var absolutePath = path.join(__dirname, 'client', filename)
    res.writeHead(200, {'Content-Type': contentType})
    done(null, fs.createReadStream(absolutePath).pipe(res))
  }
}
