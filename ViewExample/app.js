var express = require('express')
, http = require('http')
, path = require('path')

var bodyParser = require('body-parser')
, static = require('serve-static')

var app = express();
app.set('views', __dirname+'/views')
app.set('view engine', 'ejs')

// var router = express.Router();
// var user = require('./routes/user')
var config = require('./config')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(static(path.join(__dirname, 'public')))
app.use(static(path.join(__dirname, 'uploads')))
app.use(static(path.join(__dirname, 'imgs')))


var database = require('./database/database_loader')
var route_loader = require('./routes/route_loader')
route_loader.init(app, express.Router())

app.set('port', config.server_port || 3000);

// router.route('/process/login').post(user.login)
// router.route('/process/adduser').post(user.adduser)
// router.route('/process/listuser').post(user.listuser)

// app.use('/', router)

http.createServer(app).listen(process.env.PORT || 3000, function() {
    console.log('서버가 시작되었습니다.')
    database.init(app, config)
});