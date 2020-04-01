const http = require('http');

http.createServer(function(req, res) {
   console.log(req.url);
   res.writeHead(200);
   res.end('hello world');
}).listen(3030);

const buffer1 = Buffer.from('geekbang');
const buffer2 = Buffer.from([1,2,3,4]);
const buffer3 = Buffer.alloc(20);

console.log(buffer1, buffer2, buffer3);

