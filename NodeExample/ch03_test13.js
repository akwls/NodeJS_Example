var Users = [{name: 'NCT 127', age: 20}, {name: 'aespa', age: 10}, {name: 'EXO', age: 22}]
console.log('delete 키워드로 배열 요소 삭제 전 배열 요소의 수 : %d', Users.length)

delete Users[1];
console.log('delete 키워드로 배열 요소 삭제 후')
console.dir(Users)

Users.splice(1, 0, {name: 'THE BOYZ', age: 25})
console.log('splice()로 요소를 인덱스 1에 추가한 후')
console.dir(Users)

Users.splice(2, 1)
console.log('splice()로 인덱스 2의 요소를 1개 삭제한 후')
console.dir(Users)