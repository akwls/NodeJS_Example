var Users = [{name: 'NCT 127', age: 20}, {name: 'aespa', age: 10}]

console.log('unshift() 호출 전 배열 요소의 수 : %d', Users.length);

Users.unshift({name: 'EXO', age: 22})

console.log('unshift() 호출 후 배열 요소의 수 : %d', Users.length);
console.dir(Users)

Users.shift();

console.log('shift() 호출 후 배열 요소의 수 : %d', Users.length);
console.dir(Users)