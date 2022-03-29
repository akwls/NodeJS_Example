var express = require('express')
var http = require('http')

var app = express();
app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함')
    
    var person = {name: 'NCT 127', age: 20}
    // res.send(person)

    var personStr = JSON.stringify(person)
    // res.send(personStr)

    res.writeHead('200', {'Content-Type' : 'application/json; charset=utf8'})
    res.write(personStr)
    res.end();


    // send() 메소드를 쓰거나, write, end를 쓰거나 둘 중 하나만 써야함.
})

http.createServer(app).listen(3000, function() {
    console.log('Express 서버가 3000번 포트에서 시작됨')
})