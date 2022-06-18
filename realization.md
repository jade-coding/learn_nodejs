# synchronous & asynchronous

- JS는 <strong>원래 비동기적</strong>으로 일을 처리함<br/>
- nodejs 비동기적 처리 를 하기 위한 좋은 기능들을 가짐.<br/>
- 비동기는 효율적이지만 복잡함. 


공식메뉴얼에서 v8.11.2 Doc를 확인해보면,
filesystem 관련한 fs.link, linksync, mkdir, mkdirsync 이렇게 sync가 붙은것이 별도로 존재한다. 즉 기본세팅은 비동기로 하였다는 것이며 비동기적으로 처리하는 것을 선호한다는 의도를 내포함.


>var fs=require('fs');  
//readFildSync
//sample.txt는 단순한 문자 B만 담겨져 있는 txt파일임.
>console.log('A');
>var result = fs.readFileSync('syntax/sample.txt','utf8');
console.log(result);
console.log('C');
>>//결과는 A,B,C


>//readFile Async
console.log('A');
fs.readFile('syntax/sample.txt','utf8',function(err,result){
    console.log(result);
});
console.log('C');
>>//결과는 A,C,B

22.6.17 realization - callback 

var a = function(){
    console.log('A'); 
    >>자바스크립트에서는 함수가 값으로 인식한다.
    >>이렇게 함수의 이름이 없는 걸 익명 함수라고 한다.
}

function slowfunc(callback){
    callback();
}

slowfunc(a);

>>이렇게 하면 결국에는 A가 출력된다.


Package Manager / 
독립적으로 실행되는 패키지, 프로그램 안에서 작은 기능을 수행하는 모듈처럼 쓰이는 것도 패키지이다. 
그런것을 관리해주는 것 package manager이다.

NPM(Node Package Manager)
ex) PM2 // 실행중인 프로그램을 모니터링 해줌. 예고없는 비정상 종료시 재시작을 해주거나 파일 수정시 자동으로 프로세스를 Off/on 해줌. 

PM을 활용하면 서비스 운영이 매우 편리해짐.

데이터를 주고 받을 시에 
서버에서 데이터를 가져올때는 Get 할때에는 ?~~~하는 query string을 가져오게 되고요
데이터를 CRUD 할 경우에는 필요한 데이터를 URL로 보내면 안 되기에 POST 방식을 활용해야함.
이렇게 사용할 경우 URL에는 흔적을 안 남기고 은밀하게 서버로 데이터를 전송함.


