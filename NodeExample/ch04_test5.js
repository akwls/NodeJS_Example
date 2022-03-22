var fs = require('fs')

// 파일을 읽어서 동기식 IO 방식으로 읽음.
// Sync : 동기식
// 동기식은 작업이 끝날 때까지 대기함.
var data = fs.readFileSync('./package.json', 'utf-8');
console.log(data);