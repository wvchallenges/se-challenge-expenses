const fs = require('fs')
const path = require('path')
const http = require('http')
const merry = require('merry')
const bankai = require('bankai')

// Server setup

const env = merry.env({PORT: 8000})
const production = env.NODE_ENV === 'production'
const app = merry()

app.router([
  // Static assets
  ['/', serveStaticFile('index.html', 'text/html')],
  ['/app.js', serveClientJs],
  ['/tachyons.min.css', serveStaticFile('tachyons.min.css', 'text/css')],

  // API
  ['/import', {post: handleImport}],

  // Error and Not found handlers
  ['/404', serveStaticFile('not-found.html', 'text/html')]
])

http.createServer(app.start()).listen(env.PORT)
app.log.info('started listening on port ' + env.PORT)

// Route handlers

function handleImport (req, res, ctx, done) {
  done(merry.error({statusCode: 400}))
  done(null, 'hello world')
}

function serveClientJs (req, res, ctx, done) {
  const clientPath = path.join(__dirname, 'client', 'app.js')
  const assets = bankai(clientPath, {optimize: production, cssDisabled: true})
  done(null, assets.js(req, res))
}

function serveStaticFile (filename, contentType) {
  return function (req, res, ctx, done) {
    const absolutePath = path.join(__dirname, 'client', filename)
    res.writeHead(200, {'Content-Type': contentType})
    done(null, fs.createReadStream(absolutePath).pipe(res))
  }
}
