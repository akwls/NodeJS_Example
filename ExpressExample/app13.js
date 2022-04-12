var multer = require('multer')
var fs = require('fs')
var cors = require('cors')
var express = require('express')
var http = require('http')
var path = require('path')
var bodyParser = require('body-parser')
var static = require('serve-static')
var expressSession = require('express-session')

var app = express();


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/public', static(path.join(__dirname, 'public')))
app.use('/uploads', static(path.join(__dirname, 'uploads')))

app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}))

app.use(cors())


var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads')
    },
    filename: function(req, file, callback) {
        var extension = path.extname(file.originalname)
        var basename = path.basename(file.originalname)
        callback(null, basename+Date.now()+extension)
    }
})

var upload = multer({
    storage : storage,
    limits: {
        files: 12,
        fileSize: 1024 * 1024 * 1024
    }
})

var router = express.Router();

router.route('/process/photo').post(upload.array('photo1', 1), function(req, res) {
    console.log('/process/photo 호출됨')

    try {
        var files = req.files

        console.dir('#=== 업로드된 첫번째 파일 정보 =====#')
        console.dir(req.files[0])
        console.dir('#====#')

        var originalname = '',
        filename = '',
        mimetype = '',
        size = 0

        if(Array.isArray(files)) {
            console.log('배열에 들어있는 파일 갯수 : %d', files.length)
            for(var index = 0; index<files.length; index++) {
                originalname = files[index].originalname
                filename = files[index].filename
                mimetype = files[index].mimetype
                size = files[index].size
            }
        }
        else {
            originalname = files[index].originalname
            filename = files[index].name
            mimetype = files[index].mimetype
            size = files[index].size
        }
        console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size)

        res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8;'})
        res.write('<h3>파일 업로드 성공</h3>')
        res.write('<hr />')
        res.write('<p>원본 파일명 : ' +  originalname + ' -> 저장 파일명 : ' + filename + '</p>')
        res.write('<p>MIME TYPE : ' + mimetype + '</p>')
        res.write('<p>파일 크기 : ' + size + '</p>')
        res.end();
    }catch(err) {
        console.dir(err.stack)
    }

})

app.use('/', router)

http.createServer(app).listen(3000)