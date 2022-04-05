var express = require('express')
var http = require('http')
var cookieParser = require('cookie-parser')
var path = require('path')
var bodyParser = require('body-parser')
var static = require('serve-static')
var expressErrorHandler = require('express-error-handler')

var router = express.Router();

var app = express();

app.use(cookieParser())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/public', static(path.join(__dirname, 'public')))

router.route('/process/setUserCookie').get(function(req, res) {
    console.log('/process/setUserCookie 호출됨')
    res.cookie('user', {
        id: 'jungwoo',
        name: 'NCT 127',
        authorized: true
    })
    res.redirect('/process/showCookie')
})

router.route('/process/showCookie').get(function(req, res) {
    console.log('/process/showCookie 호출됨')
    res.send(req.cookies);
})

app.use('/', router)

var errorHandler = expressErrorHandler({
    static: {
        '404' : './public/404.html'
    }
})
app.use(expressErrorHandler.httpError(404))
app.use(errorHandler)

http.createServer(app).listen(3000)