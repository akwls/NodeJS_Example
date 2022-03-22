var output = '안녕 1!'
// 버퍼에 할당하고 문자열 쓰기
var buffer1 = Buffer.alloc(10)
var len = buffer1.write(output, 'utf-8')
console.log('첫 번째 버퍼의 문자열 : %s', buffer1.toString())

var buffer2 = Buffer.from('안녕 2!', 'utf-8')
console.log('두 번째 버퍼의 문자열 : %s', buffer2.toString())

console.log('버퍼 객체의 타입 : %s', Buffer.isBuffer(buffer1))

// byteLen : output을 가지고 있는 버퍼의 길이
var byteLen = Buffer.byteLength(output)
var str1 = buffer1.toString('utf-8', 0, byteLen)
var str2 = buffer2.toString('utf-8')

// buffer.copy(target, targetStart, sourceStart, sourceEnd);
buffer1.copy(buffer2, 0, 0, len)
console.log('두 번째 버퍼에 복사한 후의 문자열 : %s', buffer2.toString('utf-8'))

var buffer3 = Buffer.concat([buffer1, buffer2])
console.log('두 개의 버퍼를 붙인 후의 문자열 : %s', buffer3.toString('utf-8'))