var url = require('url');
var curURL = url.parse('https://sports.khan.co.kr/entertainment/sk_index.html?art_id=202203160942003&sec_id=540301&pt=nv');

var curStr = url.format(curURL);
console.log('주소 문자열 : %s', curStr);
console.dir(curURL);

var querystring = require('querystring');
var param = querystring.parse(curURL.query);
console.log('요청 파라미터 중 query의 값 : %s', param.query);
console.log('원본 요청 파라미터 : %s', querystring.stringify(param));