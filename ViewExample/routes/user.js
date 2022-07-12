var database;
var UserSchema;
var UserModel;

var init = function(db, schema, model) {
    database = db;
    UserSchema = schema;
    UserModel = model;
}

var authUser = function(database, id, password, callback) {
    console.log('authUser 호출됨 : ' + id + ', ' + password)


    database.UserModel.findById(id, function(err, results) {
        if(err) {
            callback(err, null)
            return
        }
        console.log('아이디 [%s]로 사용자 검색 결과', id)
        console.log(results)

        if(results.length > 0) {
            console.log('아이디와 일치하는 사용자 찾음')

            var user = new database.UserModel({id: id})
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

    var user = new database.UserModel({'id': id, 'password': password, 'name' : name})

    user.save(function(err, addedUser) {
        if(err) {
            callback(err, null)
            return;
        }
        console.log('사용자 데이터 추가함')
        callback(null, addedUser)
    })
}

var adduser = function(req, res) {
    console.log('/process/adduser 호출됨')

    var paramId = req.body.id || req.query.id
    var paramPassword = req.body.password || req.query.password
    var paramName = req.body.name || req.query.name

    var database = req.app.get('database')

    if(database.db) {
        addUser(database, paramId, paramPassword, paramName, function(err, result) {
            if(err) {
                throw err;
            }
            if(result) {
                res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
                console.dir(result)
                var context = {title: '사용자 추가 성공'}
                req.app.render('adduser', context, function(err, html) {
                    if(err) {
                        console.error('뷰 렌더링 중 에러 발생 : ' + err.stack)
                        res.write('<h2>뷰 렌더링 중 에러 발생</h2>')
                        res.write('<p>'+err.stack+'</p>')
                        res.end()
                        return
                    }
                    console.log('rendered : ' + html)
                    res.end(html)
                })
            }
            else {
                // res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
                // res.write('<h2>사용자 추가 실패</h2>')
                // res.end();
            }
        })
    }

}

var login = function(req, res) {
    var paramId = req.body.id || req.query.id
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터 : ' + paramId + ", " + paramPassword)

    var database = req.app.get('database')

    if(database.db) {
        authUser(database, paramId, paramPassword, function(err, docs) {
            if(err) {
                throw err;
            }
            if(docs) {
                console.dir(docs)

                var context = {userid: paramId, userpassword: paramPassword}
                req.app.render('login_success', context, function(err, html) {
                    if(err) {
                        console.error('뷰 렌더링 중 에러 발생 : ' + err.stack)

                        res.wrtieHead('200', {'Content-Type': 'text/html; charset=utf8'})
                        res.write('<h2>뷰 렌더링 중 에러 발생</h2>')
                        res.write('<p>'+err.stack+'</p>')
                        res.end();

                        return;
                    }
                    console.log('rendered: '+html)
                    res.end(html)
                })
            }
            else {
                var context = {userid: paramId, userpassword: paramPassword}
                req.app.render('login_fail', context, function(err, html) {
                    console.log('rendered: ' + html)
                    res.end(html)
                })
            }
        })
    }
    else {
        res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
        res.write('<h1>데이터베이스 연결 실패</h1>')
        res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>')
        res.end()
    }
}


var listuser = function(req, res) {
    console.log('/process/listuser 호출됨')

    var database = req.app.get('database')
    
    if(database.db) {
        database.UserModel.findAll(function(err, results) {
            if(err) {
                console.error('사용자 리스트 조회 중 오류 발생 : ' + err.stack)
                res.writeHead('200', {'Content-Type' : 'text/html; charset=utf8'})
                res.write('<h2>사용자 리스트 조회 중 오류 발생</h2>')
                res.write('<p>' + err.stack + '</p>')
                res.end()
                return
            }
            if(results.length > 0) {
                console.dir(results)
                var context = {results: results}
                req.app.render('listuser', context, function(err, html) {
                    if(err) {
                        console.error('뷰 렌더링 중 에러 발생')
                        res.writeHead('200', {'Context-Type': 'text/html; charset=utf8'})
                        res.write('<h2>뷰 렌더링 중 에러 발생</h2>')
                        res.write('<p>'+err.stack+'</p>')
                        res.end()
                        return
                    }
                    console.log('rendered:'+html)
                    res.end(html)
                })
            }
            else {
                var context = {results: results}
                if(results.length == 0) {
                    req.app.render('listuser_fail', context, function(err, html) {
                        console.log('rendered: ' + html)
                        res.end(html)
                    })
                }
            }
        })
    }
    else {
        res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
        res.write('<h2>데이터베이스 연결 실패</h2>')
        res.end();
    }
}

module.exports.init = init;
module.exports.login = login
module.exports.adduser = adduser;
module.exports.listuser = listuser;