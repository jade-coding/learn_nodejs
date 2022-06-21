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

## 22.6.17 realization - callback 

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

## '22.6.18 realization - received user-side transferring data

데이터를 주고 받을 시에 
서버에서 데이터를 가져올때는 Get 할때에는 ?~~~하는 query string을 가져오게 되고요
데이터를 CRUD 할 경우에는 필요한 데이터를 URL로 보내면 안 되기에 POST 방식을 활용해야함.
이렇게 사용할 경우 URL에는 흔적을 안 남기고 은밀하게 서버로 데이터를 전송함.


post방식으로 전송된 데이터를 받는법
이해하기 어렵다면 익숙해지기를 먼저해라. 

request는 위에 create서버에 콜백함수에서 나온다.
노드js로 웹브라우저가 접속을 들어올때마다 콜백함수를 호출합니다. 그때 인자를 2개를 주는데,
request는 웹브라우저가 서버에 요청을 할때, response는 서버가 웹브라우저를 보낼때 쓰인다. 

post방식으로 데이터를 전송할때 데이터가 엄청많으면 프로그램이 꺼진다거나 손상이 있을 수 있어서 post방식으로 전송되는 데이터가 많을경우 node.js는 조각조각의 양들을 서버쪽에서 수신될때마다 콜백함수를 호출하도록 약속이 되어있어요. 
데이터인자를 통해서 수신한 정보를 주기로 되어있습니다.

데이터가 들어오는 이벤트 처리를 이용해 전송된 데이터들을 가져오고 parse를 통해서 정보들을 객체화 할 수 있다.

파일생성과 리다이렉션
nodejs doc를 참고하여 생성을 하면 됨.

writeFile('message.txt', data, { signal }, 
function() => {
});
1번째 인자 : 생성할 txt 파일 이름
2번째 인자 : 파일에 입력할 데이터
3번째 인자 : 파일을 읽는 형식(ex: utf-8, ansi, etc) 
4번째 인자 : 콜백함수

리다이렉션은 사용자가 갈 경로를 재지정하는 것
 response.writeHead(302,{Location:`/?id=${title}`})

 http : 200 400 500 등을 알고 있어야 함.
 301 302는 seo 측면에서 알아두어야 하는 내용이라 할 수 있음 

 ## '22.6.21
 node js로 html을 만들어서 생성했을경우 CSS 적용하려면 정적경로 지정을 해줘야함.  express라는 모듈을 활용하여 지정하는 것 필요.
 추후에 공부하여 정리!!!

 Object? 순서가 없는 정보를 정리함. 
 Array 고유한 식별자가 존재함 like [0][1][2], 순서를 갖고 정리를 함

var member = ['hel','hwhw'];
console.log(member[1]);
>> 배열

var roles = {
    'root':'admin',
    'engineer':'Dante',
    'designer':'rose'
    }
console.log(roles.designer);
console.log(roles['designer']);

>> 객체

for(var name in roles){
    console.log(name, roles[name]);
}
> name에는 key가 담겨짐.
> value를 받고 싶다면 roles[name]라고 하면 값이 출력된다.

js에서는 함수는 처리해야할 정보를 담고 있는 statement이면서 값이다.
함수를 변수에 넣을 수 있기 때문에 값인 것이다.

ex)
var f = function(){
    console.log(1+1);
    console.log(1+2);
}

var a = [f];
a[0]();

var o ={
    func:f
}
o.func();

리팩토링
기능구현은 동일하나 코드 품질을 개선하는 행위.

모듈이 무엇인가?
var m  = {
    v:'v';
    f:function(){
        console.log(this.v);
    }
}

module.exports = m; 
m이 가리키는 모듈을 바깥에서 사용하겠다는 뜻을 가짐.

그렇기에 다른 js 파일에서 아래와 같이 적어주면
var M = require('./모듈을 만든 js 파일이름')
M.f();
-> 결과 출력됨.

