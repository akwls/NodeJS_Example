var user = require('./user6_1.js')

var showUser = function() {
    return user.getUser().name + ", " + user.group.name;
}

console.log('사용자 정보 : %s', showUser())