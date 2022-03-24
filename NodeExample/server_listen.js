var http = require('http')

http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type' : 'text/html'});
    res.write('<h1>Hello World!</h1>')
    res.end();
}).listen(3000)
// .listen(8080) -- address already in use : Oracle에서 이미 서버를 사용하고 있기 때문에 오류가 발생함.