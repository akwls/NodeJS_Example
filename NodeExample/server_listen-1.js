var http = require('http')

http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8;'});
    res.write('<h1>노드제이에스로부터의 응답 페이지</h1>')
    res.end();
}).listen(3000)