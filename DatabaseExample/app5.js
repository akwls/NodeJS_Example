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
var mongoose = require('mongoose')
var app = express();
var crypto = require('crypto')


var router = express.Router();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(static(path.join(__dirname, 'public')))
app.use(static(path.join(__dirname, 'uploads')))
app.use(static(path.join(__dirname, 'imgs')))

var database;
var UserSchema;
var UserModel;

function connectDB() {
    var databaseUrl = 'mongodb+srv://hajin7481:rlagkwls1004@cluster0.z03i3o8.mongodb.net/test'

    console.log("데이터베이스 연결을 시도합니다.");
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl)
    database = mongoose.connection

    database.on('error', console.error.bind(console, 'mongoose connection error.'))
    database.on('open', function() {
        console.log("데이터베이스에 연결되었습니다.", databaseUrl)
        createUserSchema();
    })

    database.on('disconnected', function() {
        console.log("연결이 끊어졌습니다. 5초 후 재연결합니다.")
        setInterval(connectDB, 5000)
    })
}

function createUserSchema() {
    UserSchema = mongoose.Schema({
        id: {type: String, required: true, unique: true, 'default' : ''},
        hashed_password : {type: String, require: true, 'default' : ''},
        salt: {type: String, required: true},
        name: {type: String, index: 'hashed', 'default': -1},
        age: {type: Number, 'default': -1},
        created_at: {type: Date, index: {unique: false}, 'default': Date.now},
        updated_at :{ type: Date, index: {unique: false}, 'default' : Date.now}
    })

    UserSchema.virtual('password').set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
        console.log('virtual password의 set 호출됨 : ' + this.hashed_password);
    }).get(function() {
        console.log('virtual password의 get 호출됨')
        return this._password
    })

    UserSchema.method('encryptPassword', function(plainText, inSalt) {
        if(inSalt) {
            return crypto.createHmac('sha1', inSalt).update(plainText).digest('hex')
        }
        else {
            return crypto.createHmac('sha1', this.salt).update(plainText).digest('hex')
        }
    })

    UserSchema.method('authenticate', function(plainText, inSalt, hashed_password) {
        if(inSalt) {
            console.log('authenticate 호출됨 : %s -> %s : %s',  plainText, this.encryptPassword(plainText, inSalt), hashed_password)
            return this.encryptPassword(plainText, inSalt) === hashed_password
        }
        else {
            console.log('authenticate 호출됨 : %s -> %s : %s', plainText, this.encryptPassword(plainText), this.hashed_password)
            return this.encryptPassword(plainText) === this.hashed_password
        }
    })
    
    UserSchema.method('makeSalt', function() {
        return Math.round((new Date().valueOf() * Math.random()));
    })

    var validatePresenceOf = function(value) {
        return value && value.length
    }

    UserSchema.pre('svae', function(next) {
        if(!this.isNew) {
            return next();
        }
        if(!validatePresenceOf(this.password)) {
            next(new Error('유효하지 않은 password 필드입니다.'))
        }
        else {
            next();
        }
    })

    UserSchema.path('id').validate(function(id) {
        return id.length;
    }, 'id 칼럼의 값이 없습니다.')

    UserSchema.path('name').validate(function(name) {
        return name.length
    }, 'name 칼럼의 값이 없습니다.')

    UserSchema.path('hashed_password').validate(function(hashed_password) {
        return hashed_password.length
    }, 'hashed_password 칼럼의 값이 없습니다.')


    console.log("UserSchema 정의함")

    UserSchema.static('findById', function(id, callback) {
        return this.find({id: id}, callback)
    })
    UserSchema.static('findAll', function(callback) {
        return this.find({}, callback)
    })


    UserModel = mongoose.model("users3", UserSchema)
    console.log("users 정의함")
}

var authUser = function(database, id, password, callback) {
    console.log('authUser 호출됨 : ' + id + ', ' + password)


    UserModel.findById(id, function(err, results) {
        if(err) {
            callback(err, null)
            return
        }
        console.log('아이디 [%s]로 사용자 검색 결과', id)
        console.log(results)

        if(results.length > 0) {
            console.log('아이디와 일치하는 사용자 찾음')

            var user = new UserModel({id: id})
            var authenticated = user.authenticate(password, results[0]._doc.salt, results[0]._doc.hashed_password)
            if(authenticated) {
                console.log('비밀번호 일치함')
                callback(null, results)
            }
            else {
                console.log('비밀번호 일치하지 않음')
                callback(null, null)
            }
        }
        else {
            console.log('아이디와 일치하는 사용자를 찾지 못함')
            callback(null, null)
        }
    })


}

var addUser = function(database, id, password, name, callback) {
    console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name)

    var user = new UserModel({'id': id, 'password': password, 'name' : name})

    user.save(function(err, addedUser) {
        if(err) {
            callback(err, null)
            return;
        }
        console.log('사용자 데이터 추가함')
        callback(null, addedUser)
    })
}

router.route('/process/adduser').post(function(req, res) {
    console.log('/process/adduser 호출됨')

    var paramId = req.body.id || req.query.id
    var paramPassword = req.body.password || req.query.password
    var paramName = req.body.name || req.query.name

    if(database) {
        addUser(database, paramId, paramPassword, paramName, function(err, result) {
            if(err) {
                throw err;
            }
            if(result) {
                console.dir(result)
                res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
                res.write('<h2>사용자 추가 성공</h2>')
                res.end()
            }
            else {
                res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
                res.write('<h2>사용자 추가 실패</h2>')
                res.end();
            }
        })
    }

})

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


router.route('/process/listuser').post(function(req, res) {
    console.log('/process/listuser 호출됨')
    
    if(database) {
        UserModel.findAll(function(err, results) {
            if(err) {
                console.error('사용자 리스트 조회 중 오류 발생 : ' + err.stack)
                res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                res.write('<h2>사용자 리스트 조회 중 오류 발생</h2>')
                res.write('<p>' + err.stack + '</p>')
                res.end()
                return
            }
            if(results) {
                console.dir(results)
                res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                res.write('<h2>사용자 리스트</h2>')
                res.write('<div><ul>')
                
                for(var i = 0; i<results.length; i++) {
                    var curId = results[i]._doc.id
                    var curName = results[i]._doc.name
                    res.write('<li>#' + i + ' : ' + curId + ', ' + curName + '</li>')
                }

                res.write('</ul></p>')
                res.end()
            }
            else {
                res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
                res.write('<h2>사용자 리스트 조회 실패</h2>')
                res.end();
            }
        })
    }
    else {
        res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
        res.write('<h2>데이터베이스 연결 실패</h2>')
        res.end();
    }
})

app.use('/', router)

http.createServer(app).listen(process.env.PORT || 3000, function() {
    console.log('서버가 시작되었습니다.')
    connectDB();
});