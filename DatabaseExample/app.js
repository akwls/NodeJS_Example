var express = require('express')
, http = require('http')
, path = require('path')

var bodyParser = require('body-parser')
, cookieParser = require('cookie-parser')
, static = require('serve-static')
, errorHandler = require('errorhandler')

var expressErrorHandler = require('express-error-handler')
var expressSession = require('express-session')
var cors = require('cors')
var multer = require('multer')
var app = express();


var router = express.Router();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(static(path.join(__dirname, 'public')))
app.use(static(path.join(__dirname, 'uploads')))
app.use(static(path.join(__dirname, 'imgs')))


var MongoClient = require('mongodb').MongoClient

var database;
function connectDB() {
    var databaseUrl = 'mongodb://127.0.0.1:27017/local'

    MongoClient.connect(databaseUrl, function(err, db) {
        if(err) throw err;
        console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl)
        database = db.db('local');
    })
}

var authUser = function(database, id, password, callback) {
    console.log('authUser 호출됨')

    var users = database.collection('users')
    users.find({'id': id, 'password': password}).toArray(function(err, docs) {
        if(err) {
            callback(err, null)
            return;
        }
        if(docs.length > 0) {
            console.log('아이디 [%s], 패스워드 [%s]가 일치하는 사용자 찾음', id, password)
            callback(null, docs)
        }
        else {
            console.log('일치하는 사용자를 찾지 못함')
            callback(null, null)
        }
    })

}

router.route('/process/login').post(function(req, res) {
    var paramId = req.body.id || req.query.id
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터 : ' + paramId + ", " + paramPassword)

    if(database) {
        authUser(database, paramId, paramPassword, function(err, docs) {
            if(err) {
                throw err;
            }
            if(docs) {
                console.dir(docs)

                var username = docs[0].name

                res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                res.write('<h1>로그인 성공</h1>')
                res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>')
                res.write('<div><p>사용자 이름 : ' + username + '</p></div>')
                res.write('<br><br><a href="/login.html">다시 로그인하기</a>')
                res.end()
            }
            else {
                res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                res.write('<h1>로그인 실패</h1>')
                res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>')
                res.write('<br><br><a href="/login.html">다시 로그인하기</a>')
                res.end()
            }
        })
    }
    else {
        res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
        res.write('<h1>데이터베이스 연결 실패</h1>')
        res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>')
        res.end()
    }
})

app.use('/', router)

http.createServer(app).listen(process.env.PORT || 3000, function() {
    console.log('서버가 시작되었습니다.')
    connectDB();
});