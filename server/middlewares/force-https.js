module.exports = async function forceHTTPS (ctx, next) {
  if (!ctx.secure && process.env.NODE_ENV === 'production') {
    return ctx.redirect('https://' + ctx.host)
  }
  await next()
}
