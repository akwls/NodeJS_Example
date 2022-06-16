function User(id, name) {
    this.id = id;
    this.name = name;
}

User.prototype.getUser = function() {
    return {id: this.id, name: this.name}
}

User.prototype.group = {id: 'group1', name: '김정우'}
User.prototype.printUser = function() {
    console.log('user 이름 : %s, group 이름 : %s', this.name, this.group.name)
}
User.prototype.printUsermailadd = function() {
    this.email = 's2009@e-mirim.hs.kr'
    console.log('user 이름 : %s, group 이름 : %s, user 메일 : %s', this.name, this.group.name, this.email)
}

module.exports = new User('test01', '이제노')