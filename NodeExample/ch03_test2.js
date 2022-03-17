var Person = {}
Person['age'] = 20;
Person['name'] = 'NCT 127'
Person.mobile = '010-0000-0000';
console.log('나이 : %d', Person.age)
console.log('나이 : %d', Person['age'])
console.log('이름 : %s', Person.name)
console.log('이름 : %s', Person['name'])
console.log('전화 : %s', Person['mobile'])
console.log('전화 : %s', Person.mobile)