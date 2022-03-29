var express = require('express')
var http = require('http')

var app = express();

app.use(function(req, res, next) {
    var person = {name: 'NCT 127', age: 20}
    var personStr = JSON.stringify(person)

    // 1. 아무것도 안나옴. 오류 발생
    // res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
    // res.end(person);

    // 2. json 출력됨
    // res.writeHead('200', {'Content-Type' : 'application/json; charset=utf8'})
    // res.end(personStr);

    // 3. json 출력됨(한글을 깨짐)
    // res.end(personStr)

    // 4. 문자열 출력됨
    // res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
    // res.end(personStr)

    // 5. 문자열 출력됨
    // res.send(personStr);

    // 6. 문자열 출력됨 
    // res.send(person) 

    // 7. Express 서버에서 jungwoo를 res, writeHead와 end로 응답한 결과입니다. 
    // req.user = 'jungwoo'
    // res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
    // res.end('<h1>Express 서버에서 ' + req.user + '를 res, writeHead와 end로 응답한 결과입니다.</h1>') 

    // 8. Express 서버에서 jungwoo를 res, writeHead와 end로 응답한 결과입니다.
    req.user = 'jungwoo'
    res.send('<h1>Express 서버에서 ' + req.user + '를 res, writeHead와 send로 응답한 결과입니다.</h1>') 
})

http.createServer(app).listen(3000, function() {})