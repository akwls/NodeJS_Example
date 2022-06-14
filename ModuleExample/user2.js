exports = {
    getUser: function() {
        return {id: 'test01', name: '소녀시대'}
    },
    group: {id: 'group01', name: '친구'}
}
// user2.js에서 exports에 객체를 할당하였으므로 exports는 아무것도 할당되지 않음.
// require() 호출 시 js에서 새로운 변수로 처리함.
// 결국 아무속성도 없는 {} 객체가 리턴됨