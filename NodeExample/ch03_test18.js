function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.walk = function(speed) {
    console.log(speed + "km 속도로 걸어갑니다.");
}

var person01 = new Person('NCT 127', 25);
var person02 = new Person('aespa', 20);

console.log(person01.name + ' 객체의 walk(10)을 호출합니다.');
person01.walk(10);