// process 객체는 프로세스 정보를 다루는 객체

// argv : 프로세스를 실행할 때 전달되는 파라미터(매개변수) 정보
console.log('argv 속성의 파라미터 수 : ' + process.argv.length);
console.dir(process.argv);

if(process.argv.length > 2) {
    console.log("세번째 파라미터의 값 : %s", process.argv[2])
}

process.argv.forEach((item, index) => {
    console.log(index + " : " + item)
});

console.dir(process.env);
console.log('OS 환경변수의 값 : ' + process.env['OS'])