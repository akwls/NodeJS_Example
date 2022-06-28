function User(id, name) {
    this.id = id;
    this.name = name;
}

User.prototype.getUser = function() {
    return {id: this.id, name: this.name}
}

User.prototype.group = {id: 'group1', name: '이제노'}

User.prototype.printUser = function() {
    console.log('user 이름 : %s, group 이름 : %s', this.name, this.group.name)
}

exports.user = new User('test01', '김정우')