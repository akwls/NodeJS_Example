var express = require('express')
var http = require('http')
var path = require('path')
var static = require('serve-static')
var bodyParser = require('body-parser')
var expressSession = require('express-session')

var app = express();

var router = express.Router();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(static(path.join(__dirname, 'public')))

app.use(expressSession({
    secret: 'secret key',
    resave: true,
    saveUninitialized: true
}))

router.route('/', function(req, res) {
    res.redirect('/public/index.html')
})

router.route('/process/login').post(function(req, res) {
    var paramId = req.body.id || req.query.id
    var paramPassword = req.body.password || req.query.password;

    req.session.user = {
        id: paramId,
        authorized: true
    }

    res.writeHead(200, {"Content-Type": "text/html; charset=utf8;"});
    res.write('<h1>로그인 성공</h1>')
    res.write("<br>")
    res.write(`<p>Param id : ${paramId}</p>`)
    res.write(`<p>Param password : ${paramPassword}</p>`)
    res.write('<button style="background-color: tomato;"><a href="/product.html" style="text-decoration: none; color: white;">상품 페이지로 이동하기</a></button>')
    res.end();

    
})

router.route('/process/logout').get(function(req, res) {

    if(req.session.user) {

        req.session.destroy(function(err) {
            if(err) {throw err;}
            res.redirect('/login2.html')
        })
    }
    else {
        res.redirect('/login2.html')
    }

})

app.use('/', router)
http.createServer(app).listen(3000, function() {
    console.log('Express server listening on port 3000')
});