var fs = require('fs')

// 읽기 모드로 파일 열기
fs.open('./output.txt', 'r', function(err, fd) {
    if(err) throw err;

    // 10 크기로 버퍼 할당
    var buf = Buffer.alloc(10);
    // 생성한 버퍼가 버퍼 타입인지
    console.log('버퍼 타입 : %s', Buffer.isBuffer(buf))

    // 할당한 버퍼의 크기만큼 파일에서 읽기
    fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer) {
        if(err) throw err;
        // 읽은 내용을 문자열로 변경
        var inStr = buffer.toString('utf-8', 0, bytesRead)

        // 읽은 내용 출력
        console.log('파일에서 읽은 데이터 : %s', inStr)

        // bytesRead : 실제 파일에서 읽은 내용의 길이
        console.log(err, bytesRead, buffer)
        
        fs.close(fd, function() {
            console.log('output.txt 파일을 열고 읽기 완료.')
        })
    })
})