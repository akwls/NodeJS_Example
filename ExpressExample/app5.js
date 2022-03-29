var express = require('express')
var http = require('http')

var app = express();

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어에서 요청을 처리함')

    // 해당 사이트로 이동
    res.redirect('https://google.com')
})

http.createServer(app).listen(3000);