var Calc = require('./calc33');

var calc = new Calc();
calc.emit('start');
calc.emit('subtitle', '계산기')
calc.emit('cal', 'a', 'b')
var a = 10;
var b = 5;

console.log('a + b = ' +  calc.add(a, b));
console.log('a - b = ' +  calc.subtract(a, b));
console.log('a * b = ' +  calc.multiply(a, b));
console.log('a / b = ' +  calc.divide(a, b));
console.log(Calc.title + "의 이벤트 종료함")
