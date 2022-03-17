var Users = [{name: 'NCT 127', age: 20}, {name: 'aespa', age: 10}]

console.log('push() 호출 전 배열 요소의 수 : %d', Users.length);

Users.push({name: 'EXO', age: 22})

console.log('push() 호출 후 배열 요소의 수 : %d', Users.length);

Users.pop();

console.log('pop() 호출 후 배열 요소의 수 : %d', Users.length);