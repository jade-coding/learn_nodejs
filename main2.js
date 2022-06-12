var http = require('http');
var fs = require('fs');
var url = require('url');
const { syncBuiltinESMExports } = require('module');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    var pathname = url.parse(_url,true).pathname;
    console.log(queryData.id);
  
   
    // if(_url == '/' || _url == '/?'){
    //   title = 'Web';
    //   queryData.id='Index';
    // }
    // if(_url == '/favicon.ico'){
    //     response.writeHead(404);
    //     response.end();
    //     return;
    // }

  console.log(pathname);

var list = '<ul>';
if(pathname ==='/'){
  if(queryData.id === undefined){
    var title ="Web";
    queryData.id = 'Introduction'; 
      }
      var dirlist = new Array();
      fs.readdir('./data',function(err,filelist){   // 이 구문을 벗어나면 filelist 값들을 전달받은 전역변수 dirlist의 메모리에서 다 사라짐.. 
        dirlist = filelist;
        // console.log("34번째줄" + dirlist);
        var i = 0;
      
          while(i<dirlist.length){
            list = list + `<li><a href="/?id=${dirlist[i]}"> ${dirlist[i]}</a></li>`;
            i++;
            // console.log("39번째줄"+ list + "진행상황" );
            }
          list += '</ul>';
         
         // console.log(list); // 분명히 list는 전역으로 밖에 선언했지만 이 read 함수를 벗어나는 순간 갖고 있는 값들이 사라짐..
           
        });

        
          
    fs.readFile(`data/${queryData.id}`,'utf-8', function(err,description)
      {
        console.log(queryData.id+"값입니다.");
        setTimeout(() => console.log("Asnynchrnozing"), 1000); // 이유를 찾았다.. non-blocking 방식이어서 값이 들어가기전 데이터를 받아버린것임.
        console.log(list);
        var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title} </title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <h2>${list}</h2>  
          <p>${description}</p>
        </body>
        </html>
        `;
        //내가 list파일에 <H2>태그 안 씌우니.. 위에서 계속 문제인 것마냥 오류를 계속 호출했음...
        // 
        response.writeHead(200);
        response.end(template);
      });
    } 
  
  else{
    response.writeHead(404);
    response.end('Not found');
  }
  
    
    // console.log(__dirname + url);
  
     
   
    // response.end('egoing :'+ url);
   
});//create server end state;
app.listen(3000);

// JS는 혼자서 서버의 파일들을 수색할 수가 없음. 된다고하면 보안상의 무제가 더 커질거임.


/*
왜, after가 출력되기도 전에 done!이 먼저 출력되는 것일까요?

기본적으로 자바스크립트의 실행 환경은 프로그램의 실행을 최대한 막지 않는(non-blocking) 방식, 즉 비동기(asynchronous)로 코드를 실행해줍니다. 쉽게 말해, 나중에 실행해야 할 코드는 옆으로 잠깐 치워놓았다가, 당장 실행이 가능한 다음 코드를 먼저 처리 후에, 다시 때가되면 원래 코드를 실행해줍니다.

이러한 자바스크립트의 비동기 프로그래밍 모델은 브라우저와 같이 리소스가 제한된 환경에서 성능 상의 큰 강점을 나타냅니다. 하지만 개발자 입장에서는 코드가 순서대로 실행되지 않는듯한 착시 때문에 직관적으로 이해가 어려워 자바스크립트를 배우려는 많은 분들에게 큰 걸림돌로 작용하기도 합니다.

 */