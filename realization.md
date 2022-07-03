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

## '22.6.22
API(Application Program Interface)

fs.readFile은 내가 만든것이 아니다. nodejs를 만든 개발자들은 파일을 읽을때는 readfile을 사용하라고 Doc에 정리하고 있음.
사용자와 개발자간의 약속된 조작장치임

nodejs의 api 문서를 보면 버전별 기능들에 대한 모듈 소개란이 있음
확인하면서 배운다면 많은 배움을 얻을 수 있음

더 배워볼만한 것으로는
Java script, Database(mongo DB, MySQL), Framework, module API(nodejs Awesome을 검색해서 보면 신기한 module을 많이 접할 수 있음)

pm2 start main.js --watch
pm2 list
pm2 kill - 모든 pm2로 관리하던 프로세스들 종료
pm2 start main.js --watch --no-daemon // 로그까지 볼 수 있게 해줌
daemon은 백그라운드에서 실행하는 것임.

pm2 log로 보면 create 하게 되면 중간에 js가 꺼졌다 켜지는 것을 볼 수 있음...
이럴경우 세션이 날라간것임. 
-> pm2 start main.js --watch --ignore-watch="data/* 이런식으로 하면 해결할 수 있음.

DNS(Domain Naming System) : IP주소를 알 수 없기에 DNS서버를 두어서 거기서 ip주소로 변환을 해주는 시스템을 갖춤

인터넷에 연결된 장비들은 모두 ip를 가진다. 
host는 네트워크에 연결된 장치를 일컫는다.

hosts라는 파일에 xx.xx.xx.xx www.00000.com 이런 식으로 정리해서 해결을 할수도 있긴하다.

C:\Windows\System32\drivers\etc에 host파일이 존재함.

인터넷상의 보안
hosts파일을 악의적으로 변조하여 악성페이지로 이동시킬수 있어서 취약함.
pishing (피싱)

https로 되어있는 사이트를 변조한후에 http로 된 사이트를 만들면 브라우저도 위험을 경고한다. http로 되어있다면 안전한지 다시 한번 확인해볼 필요가 있다. https가 더 안전함!

++ 백신을 사용하면 hosts의 변조를 계속 모니터링함.

DNS를 사용하기 이전시대에는 IP주소부를 기록해서 정리해야했다.
hosts는 자기 pc에서만 활용할수 있는 IP주소부이다. 
stanford research institue(스탠포드연구소)에서 전세계 hosts 파일을 관리했었음.
해당 기관에서 host파일의 내용을 사용자의 PC hosts에 갱신해주어서 일을 처리했음. 

- 문제점
    1. 스탠포드연구소가 요청이 온것을 갱신하는데도 latency도 발생하고있음
    2. 스탠포드연구소에서 갱신해주지 않으면 user는 원하는 destination에 접속을 할 수가 없음. 

그래서 john postel, paul mockapetris는 DNS라는 것을 발명하게 됨.

## '22.6.23 

DNS의 원리
DNS 서버는 도메인 네임에 대한 IP를 기억하고 있고 client에게 IP를 제공해줌

public DNS의 사용
COM가 DNS서버를 알아야한다. 통신사(ISP : Internet Service Provider)가 DNS 서버를 자동으로 할당하는 메커니즘을 가지고 있다. 
DNS서버를 자동으로 할당하는 것을 Manual하게 변경하고 싶다면
public DNS list에서 신뢰할만한 기관 또는 기업의 DNS 주소를 넣어서 사용하면 된다.

    도메인 이름의 구조
    blog.xxxxx.com.
    역순으로 . 은 root
    com은 top-level
    xxxxx은 second-level
    blog는 sub이다.

각 레벨마다 DNS 서버가 존재한다.
각 서버마다 전담하는 파트가 나뉘어져있는 것
ROOT 담당하는 DNS서버는 TOP-level을 담당하는 서버들의 목록을 알고 있어야 하고
TOPlevel 담당하는 서버는 second level을 담당하는 서버들을 알고 있어야 한다.
하위 레벨 IP는 알지만 차하위 차차하위 파트는 알 필요가  없다.

DNS가 기술적인 것 같지만 행정적인 것이 대부분이고 기술적인 부분이 뒷받침해주고 있다.

ICANN이라는 거대한 비영리 단체는 전세계 ip주소를 관리하고  root name 서버들의 관리자임
a~m.root.server.net / 13개의 루트 서버가 존재함

그 밑에 Registry라는 등록소가 존재하며 .com, .net 등 top-level 도메인들을 관리함

그 밑에 Register라는 등록대행자가 존재함. 
사용자가 등록대행자에게 쓰고 싶은 도메인을 알려주면 등록대행자는 등록소에 등록을 해준다. 등록소는 구입한 도메인에 대해서 소유권을 대행자에게 전파하여 해당 기간동안 소유권을 주장할 수 있도록 해줌

전세계에 모든 도메인서버들은 기본적으로 root 네임 서버들의 주소가 무엇인지 알고있다!! 

>> example.com의 ip를 알고 싶을때 어떻게 하면 되는가?
    nslookup, dig(win은 호환되지 않음)

    cmd에 nslookup www.naver.com을 치면 나오는 결과 값은
    naver.com의 ip를 알 수 있다.

    서버:    UnKnown
    Address:  192.168.1.254

권한 없는 응답:
    이름:    www.naver.com.nheos.com
    Addresses:  223.130.195.95
            223.130.195.200
    Aliases:  www.naver.com

    위 ip는 내가 쓰는 통신사의 DNS서버 ip인것이다. 

    DNS시스템에는 구석구석의 캐시라는 것을 가지고 있다. 
    한번 naver.com을 한번 요청했었다면 그것을 기억해주고 있다가 다시 요청이 올 경우 바로 답변을 해주게 됨 - 캐시를 활용하여 비효율적인 요청과 처리를 줄여줌

    내가 붙어있는 DNS에서 바로 결과값을 알려주게 되면 권한없는 응답 non authoritive라고 하는 것이다. 즉, 권위있는 응답은 해당 DNS 서버까지 가서 확인하는 것이다

    직접 권위있는 곳에 물어보고 싶다면
    
    

>nslookup -type=ns naver.com
서버:    UnKnown
Address:  192.168.1.254

권한 없는 응답:
naver.com       nameserver = e-ns.naver.com
naver.com       nameserver = ns1.naver.com
naver.com       nameserver = ns2.naver.com

name server는 gns1.nheos.com이 된다.

그렇다면 직접 해당 DNS에 물어보고 싶다면
>nslookup naver.com ns1.naver.com
서버:    ns1.naver.com
Address:  125.209.248.6

이름:    naver.com
Addresses:  223.130.195.200
          223.130.200.104
          223.130.195.95
          223.130.200.107

권한있는 응답을 해준다. 

-type=ns는 네임서버를 알려주는 것이다.
-type=ns를 쓰지 않을 경우에는 -type=a가 Default로 설정 되어있다.

나만의 DNS 장만하는법
EX)  freenon.com 

DNS record & CNAME 
nameserver에게 dns4u.ga A xx.xx.xx.xx
dns4u.ga의 ip는 xx.xx.xx.xx 이라는 뜻을 가짐
위 정보 한 건을 DNS 레코드라고 한다. 
DNS에게 요청하는 명령문이라고 생각하면 됨

dns4u.ga NS ns01.freenom.com
dns4u.ga의 네임서버는 ns01.~~ 이라는 레코드이다.

CNAME이라는 레코드는 별명을 지어주는 것이다.
example.com 을 www.example.com이라고 별명을 지어줄 수 있다.

집에서 DNS서버를 만들경우 IP가 계속 변경되는 환경에 맞춰서
Dynami DNS를 활용하게 된다. 

HTTPS, SSL을 활용하여 웹브라우저의 보안을 강화한다.

 HTTP에 대하여
 HTTP : web browser와 서버가 통신을 하기 위한 약속
 HTTP는 초기에 매우 간단한 기능을 가지고 있었으나 점점 추가되었고
 훗날에 웹을 동작하는 근간이 되어버렸다

HTTP는 request, response를 위한 메세지약속이다.
형식을 찾아보면서 공부하면 배우는 것이 많음

http response Format
- status code 
    - 1xx : codes informational - 정보를 주기 위함, 잘 활용하지 않음
    - 2xx : codes successes - 성공
    - 3xx : codes Redirection - 리다이렉션(재방향 지정)
    - 4xx : codes Client Error - 클라이언트 쪽 에러, 404 Not Found
    - 5xx : codes Server Error - 서버 쪽 에러

더 심화공부 할만한 주제 
-  HTTP와 HTTPS의 차이점 
-  Cache, cache-control pragma
-  Cookie, web strorage 
-  Proxy
- 네트워크를 모니터링하는 도구들(개발자도구>네트워크,  wireshark)

## '22.7.2 쿠키와 인증절차
web이 발전하면서 개인화에 초점을 맞추게 된다.
이전에 접속했던 사용자의 정보를 웹서버로 전송할 수 있는 쿠키를 전달하여 웹 서버는 사용자가 누구인지를 알아서 개인화를 제공해줄 수 있게 되었다.

쿠키는 웹브라우저 웹 서버가 주고받는 정보이면서 HTTP 프로토콜에 포함되는 기술이다.
http cookie라고 검색하면 추가 설명을 알 수 있다. 
쿠키는 인증, 개인화, 방문자 트랙킹 기능을 한다. 
Set-Cookie : <cookie-name>=<cookie-value>

ex)
Set-cookie: yummy-cookie=choco
야미쿠키라는 쿠키는 초코라는 쿠리를 생성한다.
한번 서버로부터  response받으면 Cookie를 받은 것을 기억하고 있다가 해닫 페이지를 다시 접속할때 서버에 함께 전송해준다.

## '22.7.3 permanent cookies Session cookies
Session 쿠키는 실행되는 동안만 유효하고 다시 키면 사라짐.
permanent는 꺼도 쿠키가 살아있음.
Max-Age : 현재시점에서 상대적으로 얼마나 살아있을것인지
Expires : 절대적으로 쿠키가 언제 죽을 것인지를 나타낸다.

ex)
 'Set-Cookie':['yummy_cookie=choco',
                'tasty_cookie=strawberry',
                `permanent=cookies; Max-Age=${60*60*24*30}`
            ]
라고하면 permanent 쿠키는 한달 뒤 expire 되는 쿠키로 존재하여 브라우저가 종료되어도 여전히 존재하게 된다.

# secure and httponly cookie
브라우저와 웹서버가 http로 통신을 할 경우에만 쿠키를 전송한다.
secure 라는 플래그는 https request일 경우에만  response header에 해당 쿠키를 담아주게 된다.

httponly라는 플래그는 js로 값을 호출해도 출력하지 않는다. 오직 http 통신에대해서만 값을 출력해준다.

path 플래그는 어떤 디렉토리를 지정하면 그 디렉토리아 그 아래에서만 활성화되어 웹브라우저는 거기에 해당되는 쿠키만을 웹 서버에게 전송한다.

domain 플래그는는 앞에 어떤 서브도메인에서든 살아남는다는 뜻을 가진다.
해당 도메인에서만 살아남는다는 뜻이 아니다!!

