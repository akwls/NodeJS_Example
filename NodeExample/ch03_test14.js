var Users = [{name: 'NCT 127', age: 20}, {name: 'aespa', age: 10}, {name: 'EXO', age: 22}, {name: 'THE BOYZ', age: 25}]

console.log('배열 요소의 수 : %d', Users.length)
console.log('원본 Users')
console.dir(Users)

var Users2 = Users.slice(1, 3)

console.log('slice()로 잘라낸 후 Users2')
console.dir(Users2)

var Users3 = Users2.slice(1)

console.log('slice()로 잘라낸 후 Users3')
console.log(Users3)