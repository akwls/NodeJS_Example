var express = require('express')
var http = require('http')
var path = require('path')

var bodyParser = require('body-parser')
var static = require('serve-static')

var app = express()

app.set('port', process.env.PORT || 3000)

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended: false}))

// body-parser를 이용헤 application/json 파싱
app.use(bodyParser.json())

// 접속하면 public 폴더 이동
app.use('/', static(path.join(__dirname, 'public')))
// app.use('/public', static(path.join(__dirname, 'public')))

app.use(function(req, res, next) {
    console.log('첫번째 미들웨어에서 요청을 처리함')

    var paramId = req.body.id || req.query.id
    var paramPassword = req.body.password || req.query.password

    // res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
    // res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>')
    // res.write('<div><p>Param id : ' + paramId + '</p></div>')
    // res.write('<div><p>Param password : ' + paramPassword + '</p></div>')
    // res.end()

    // static 경로가 '/public'일 때, login 페이지로 리다이렉트
    // res.redirect("/public/login.html")
    // static 경로가 '/'일 때, login 페이지로 리다이렉트
    res.redirect("/login.html")
})

http.createServer(app).listen(app.get('port'));