var express = require('express')
var http = require('http')
var path = require('path')

var bodyParser = require('body-parser')
var static = require('serve-static')

var router = express.Router();

var app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/public', static(path.join(__dirname, 'public')))

// form 태그에서 데이터를 받음.
// form 태그의 action="path" == route('path')
// http://localhost:3000/process/login 로 이동
router.route('/process/login').post(function(req, res) {
    console.log('/process/login 처리함')

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>')
    res.write('<div><p>Param id : ' + paramId + '</p></div>')
    res.write('<div><p>Param password : ' + paramPassword + '</p></div>')
    res.write('<a href="/public/login2.html">로그인 페이지로 돌아가기</a>')
    res.end()
})

app.use('/', router)

http.createServer(app).listen(3000);

