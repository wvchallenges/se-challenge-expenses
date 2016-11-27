# node-checksum-buffer

A node module that uses [multihash](https://github.com/jbenet/node-multihash/) to make checksummed buffers. The checksum is at the beginning of the buffer (not at the end) because the multihash defines its own length.

## Example

```
> cat try.js
```
```js
var CkBuffer = require('checksum-buffer')

// let's make some data
var buf = new Buffer('beep boop')
console.log('buffer: ' + buf.inspect())

// let's checksum that data
var ckbuf = new CkBuffer(buf, 'sha1')
console.log('ckbuffer: ' + ckbuf.buffer.inspect())

// check if the checksum passes
console.log('ok? ' + ckbuf.check())

// get the checksum only
console.log('checksum: ' + ckbuf.checksum().inspect())

// get the raw data back
var data = ckbuf.data()
console.log('data: ' + data.inspect())

// Oooh! let's mess with the data!
data[data.length - 1] = 0x00
console.log(ckbuf.buffer)
console.log('ok? ' + ckbuf.check())

// you can write to the data buffer
data.write('boop beep')
console.log('new data: ' + data.inspect())

// but make sure to recalculatea
console.log('ok? ' + ckbuf.check())
console.log('new cksum: ' + ckbuf.recalculate().inspect())
console.log('ok? ' + ckbuf.check())
```

```
> node try.js
buffer: <Buffer 62 65 65 70 20 62 6f 6f 70>
ckbuffer: <Buffer 11 14 7c 83 57 57 7f 51 d4 f0 a8 d3 93 aa 1a aa fb 28 86 3d 94 21 62 65 65 70 20 62 6f 6f 70>
ok? true
checksum: <Buffer 11 14 7c 83 57 57 7f 51 d4 f0 a8 d3 93 aa 1a aa fb 28 86 3d 94 21>
data: <Buffer 62 65 65 70 20 62 6f 6f 70>
<Buffer 11 14 7c 83 57 57 7f 51 d4 f0 a8 d3 93 aa 1a aa fb 28 86 3d 94 21 62 65 65 70 20 62 6f 6f 00>
ok? false
new data: <Buffer 62 6f 6f 70 20 62 65 65 70>
ok? false
new cksum: <Buffer 11 14 83 2a 65 89 c9 19 5a 72 c0 ae 07 91 47 d5 51 e8 9a 97 20 bd>
ok? true
```
