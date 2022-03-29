var http = require('http')

var server = http.createServer();

var host = '10.96.124.84'
var port = 3000

// 50000 : 서버 접속 수를 제한함.
server.listen(port, host, '50000', function() {
    console.log('웹 서버가 시작되었습니다. => ' + host + " : " + port)
})