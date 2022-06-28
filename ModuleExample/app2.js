var express = require('express')
, http = require('http')
, path = require('path')

var bodyParser = require('body-parser')
, static = require('serve-static')

var mongoose = require('mongoose')
var app = express();

var router = express.Router();
var user = require('./routes/user')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(static(path.join(__dirname, 'public')))
app.use(static(path.join(__dirname, 'uploads')))
app.use(static(path.join(__dirname, 'imgs')))


var database;
var UserSchema;
var UserModel;

function connectDB() {
    var databaseUrl = 'mongodb://127.0.0.1:27017/local'

    console.log("데이터베이스 연결을 시도합니다.");
    mongoose.Promise = global.Promise;
    mongoose.connect(databaseUrl)
    // mongoose.connect(databaseUrl, {useMongoClient: true})
    database = mongoose.connection

    database.on('error', console.error.bind(console, 'mongoose connection error.'))
    database.on('open', function() {
        console.log("데이터베이스에 연결되었습니다.", databaseUrl)
        createUserSchema(database);
    })

    database.on('disconnected', function() {
        console.log("연결이 끊어졌습니다. 5초 후 재연결합니다.")
        setInterval(connectDB, 5000)
    })
    app.set('database', database)
}

function createUserSchema(database) {

    database.UserSchema = require('./database/user_schema').createSchema(mongoose);
    database.UserModel = mongoose.model("users3", database.UserSchema);
    console.log("UserModel 정의함")

    user.init(database, UserSchema, UserModel)

}

router.route('/process/login').post(user.login)
router.route('/process/adduser').post(user.adduser)
router.route('/process/listuser').post(user.listuser)

app.use('/', router)

http.createServer(app).listen(process.env.PORT || 3000, function() {
    console.log('서버가 시작되었습니다.')
    connectDB();
});