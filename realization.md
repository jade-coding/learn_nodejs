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
