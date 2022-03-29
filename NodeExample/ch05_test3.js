var http = require('http')

var server = http.createServer();

var port = 3000

server.listen(port, function() {
    console.log('웹서버가 시작되었습니다. : %d', port)
})

server.on('connection', function(socket) {
    console.log('클라이언트가 접속했습니다. : %s, %d', socket.remoteAddress, socket.remotePort)
})

server.on('request', function(req, res) {
    res.writeHead(200, {'Content-type' : 'text/html; charset=utf-8'})
    res.write('<title>응답 페이지</title>')
    res.write('<h1>노드제이에스로부터의 응답 페이지</h1>')
    // write에서 쓴 문자열을 end에서 화면에 출력함.
    res.end();
})

server.on('end', function() {
    console.log('서버가 종료됩니다.')
})