var multihashing = require('multihashing')
var bufeq = require('buffer-equal')

module.exports = CkBuffer

// Usage:
//   CkBuffer(rawBuffer, func, [length])
//   CkBuffer(ckbuffer)
function CkBuffer(buf, func, length) {
  if (!(this instanceof CkBuffer))
    return new CkBuffer(buf, func, length)

  if (!buf) throw new Error('CkBuffer requires buffer param')

  if (!func) {
    this.buffer = buf
    var sum = this.checksum()
    var dec = multihashing.multihash.decode(sum)
    this.mhparams = {
      code: dec.code,
      length: dec.length,
    }
  } else {
    var sum = multihashing(buf, func, length)
    this.buffer = Buffer.concat([sum, buf])
    this.mhparams = {
      code: func,
      length: length,
    }
  }
}

// returns a checksum buffer
CkBuffer.prototype.checksum = function() {
  var length = this.buffer[1] // mh length is at 1
  return this.buffer.slice(0, length + 2) // + 2 bytes, func + len
}

// returns a data buffer
CkBuffer.prototype.data = function() {
  var length = this.buffer[1] // mh length is at 1
  return this.buffer.slice(length + 2) // + 2 bytes, func + len
}

// whether the checksum checks out
CkBuffer.prototype.check = function() {
  var data = this.data()
  var sum1 = this.checksum()
  var sum2 = multihashing(data, this.mhparams.code, this.mhparams.length)
  return bufeq(sum1, sum2)
}

// recalculate checksum
CkBuffer.prototype.recalculate = function() {
  var data = this.data()
  var sum = multihashing(data, this.mhparams.code, this.mhparams.length)
  sum.copy(this.buffer)
  return sum
}
