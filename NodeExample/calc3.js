// 객체가 EventEmitter를 상속받아야 emit, on 사용 가능.
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Calc = function() {
    this.on('stop', function() {
        console.log('Calc에 stop event 전달됨')
    })
}

//  util의 inherits 메소드를 통해 calc가 EventEmitter를 상속받도록 함.
util.inherits(Calc, EventEmitter)

Calc.prototype.add = function(a, b) {
    return a + b;
}

module.exports = Calc;
module.exports.title = 'calculator'