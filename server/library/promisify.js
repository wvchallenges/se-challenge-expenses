function promisify (fn) {
  return function () {
    const args = [].slice.call(arguments)

    return new Promise((resolve, reject) => {
      args.push(function (err) {
        if (err) {
          return reject(err)
        }

        const results = [].slice.call(arguments, 1)
        resolve((results.length > 1) ? results : results[0])
      })

      fn(...args)
    })
  }
}

module.exports = promisify
