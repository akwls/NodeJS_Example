function Person(name, age) {
	this.name = name;
	this.age = age;
}

Person.prototype.cook = function(food) {
    console.log(this.name + " 객체의 cook('" + food + "')를 호출합니다.");
    console.log(food+"를 요리합니다.");
}

Person.prototype.sleep = function(hours) {
    console.log(this.name + " 객체의 sleep(" + hours + ")를 호출합니다.");
    console.log(hours+"시간 동안 잠을 잡니다.");
}

Person.prototype.work = function(hours) {
    console.log(this.name + " 객체의 work(" + hours + ")를 호출합니다.");
    console.log(hours+"시간 동안 일합니다.");
}

var person1 = new Person('3104김하진', 19);
var person2 = new Person('정우', 25);
var person3 = new Person('성찬', 23);

person1.sleep(9);
person2.cook('김치볶음밥')
person3.work(8);