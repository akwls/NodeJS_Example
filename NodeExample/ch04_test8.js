var fs = require('fs')

// open(path, flags, mode, callback)
// fd는 파일의 별칭
fs.open('./output.txt', 'w', function(err, fd) {
    if(err) throw err;
    // 쓰고자 하는 데이터로 버퍼 생성
    var buf = Buffer.from('안녕!\n')

    // write(fd, buffer, offset, length, position, callback)
    // 버퍼의 내용을 파일에 출력
    fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) {
        if(err) throw err;
        console.log(err, written, buffer);

        // close(fd, callback)
        fs.close(fd, function() {
            console.log('파일 열고 데이터 쓰고 파일 닫기 완료')
        })
    })
})