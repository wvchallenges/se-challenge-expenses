module.exports = function requestLogger (log) {
  return (async (ctx, next) => {
    log.info({method: ctx.method, url: ctx.url}, 'request')
    await next()
  })
}
