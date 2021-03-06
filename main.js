var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var cookie = require('cookie');

const { syncBuiltinESMExports } = require('module');
const { ifError } = require('assert');

//js로 만든 html파일은 결국 서버의 입장에서 파일경로를 새로 구성해서 넣어줘야함.
//분리된 파일로 관리할경우 js에 html 파일에 <style>태그로 집어넣어주면 js로 만든 html 파일에 css 적용이 가능함.
function templateHTML(title,list,description, control, authStatusUI){
 return `<!doctype html> 
 <html>
 <head>
   <title>WEB1 - ${title} </title>
   <meta charset="utf-8"> 
   <link rel="stylesheet" href="./style.css">
 </head>
 <body>
   ${authStatusUI}
   <h1><a href="/">WEB</a></h1>
   <h2>${list}</h2>  
       ${control}
   <h2>${title}</h2>
   <p>${description}</p>
 </body>
 </html>
 `;
}

function authStatusUI(request,response){
  var authStatusUI ='<a href="/login">login</a>';
  if(authIsOwner(request,response)){
    authStatusUI='<a href="/logout_process">logout</a>';
  }
  return authStatusUI;
}
function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i<filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}"> ${filelist[i]}</a></li>`;
    i++;
    }
  list += '</ul>';
  return list;
}

function authIsOwner(request,response){
  var isOwner = false;
  var cookies={};
  if(request.headers.cookie){
    cookies = cookie.parse(request.headers.cookie);
   }
  if(cookies.email =='egoing777@gmail.com' && cookies.password === '111111'){
    isOwner = true;
  }
  console.log(cookies);
  return isOwner;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    var pathname = url.parse(_url,true).pathname;  

var list ='<ul>';
var control =  ``;
if(pathname ==='/'){
  if(queryData.id === undefined || queryData.id ==='Web'){
    var title ="Web";
    queryData.id = 'Web'; 
    control = `<a href="/create">create</a>`;
      }
  else{
    control= `<a href="/create">create</a>
              <a href="/update?id=${title}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete" class="deletebtn">
              </form>
             `;
  }

      // 페이지에 List 영역을 담당.
      fs.readdir('./data',function(err,filelist){   // 이 구문을 벗어나면 filelist 값들을 전달받은 전역변수 dirlist의 메모리에서 다 사라짐.. 
       list = templateList(filelist);
         // console.log(list); // 분명히 list는 전역으로 밖에 선언했지만 이 read 함수를 벗어나는 순간 갖고 있는 값들이 사라짐..
        });
        
    fs.readFile(`data/${queryData.id}`,'utf-8', function(err,description)
      {
        var template = templateHTML(title, list, description, control, authStatusUI(request,response));
       
        response.writeHead(200);
        response.end(template);
      });
    } 
  else if(pathname ==='/create'){
    var title ="Create";
    queryData.id = 'Creation'; 
    var dirlist = new Array();
    fs.readdir('./data',function(err,filelist){   // 이 구문을 벗어나면 filelist 값들을 전달받은 전역변수 dirlist의 메모리에서 다 사라짐.. 
      list = templateList(filelist);
       
       // console.log(list); // 분명히 list는 전역으로 밖에 선언했지만 이 read 함수를 벗어나는 순간 갖고 있는 값들이 사라짐..
         
      });
      
    setTimeout(() => {
    var description=`
      <form action="/create_process" method="post">
      <p><input type ="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="detail"></textarea>
      </p>
      <p> 
      <input type="submit">
      </p>
      </form>
      `;

    var template = templateHTML(title, list, description, control, authStatusUI(request,response));
      response.writeHead(200);
      response.end(template);
    }, 100);

      //내가 list파일에 <H2>태그 안 씌우니.. 위에서 계속 문제인 것마냥 오류를 계속 호출했음...
      // 
  }
  else if(pathname ==='/login'){
    fs.readdir('./data',function(err,filelist){   // 이 구문을 벗어나면 filelist 값들을 전달받은 전역변수 dirlist의 메모리에서 다 사라짐.. 
      var title = 'Login';
      var description =  
      `<form action="login_process" method="post">
          <p><input type="text" name="email" placeholder="email"></p>
          <p><input type="password" name="password" placeholder="password"></p>
          <p><input type="submit"></p>
        <form>`;

      var list = templateList(filelist);
      var html = templateHTML(title,list,description,'');
      response.writeHead(200);
      response.end(html);
    });
    
  }
  else if(pathname === '/login_process'){
    var body='';
    request.on('data',function(data){
      body += data;
    });
    request.on('end',function(){
      var post = qs.parse(body);
      if(post.email === 'egoing777@gmail.com' && post.password === '111111'){
      response.writeHead(302,{
        'Set-Cookie':[
          `email=${post.email}`,
          `password=${post.password}`,
          `nickname=egoing`
        ],
        Location:`/` 
       });
    
      response.end();
      }
      else{
        response.end('Who?');
      }
    });

  }    // console.log(list); // 분명히 list는 전역으로 밖에 선언했지만 이 read 함수를 벗어나는 순간 갖고 있는 값들이 사라짐..      
  else if(pathname === '/create_process'){
    var body='';
    request.on('data',function(data){
      body += data;
    });
    request.on('end',function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`,description,'utf-8',
      function(err){
        response.writeHead(302,{Location:`/?id=${title}`});
        response.end();
      });
     });
  
   
  }
  else if(pathname === '/update'){
    fs.readdir('./data',function(error,filelist){
      fs.readFile(`data/${queryData.id}`,'utf-8',function(err, description){
        var title = queryData.id;
        var list = templateList(filelist);
        var control=`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`;
        template=templateHTML(title,list,
        `<form action="/update_process" method="POST">
        <p><input type="hidden" name="id" value="${title}">
        <p><input type ="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description" placeholder="detail">${description}</textarea>
        </p>
        <p> 
        <input type="submit">
        </p>
        </form>
        `, 
        control,
        authStatusUI(request,response));
        response.writeHead(200);
        response.end(template);
      })
    });

   
  }
  else if(pathname === '/update_process'){
    var body='';
    request.on('data',function(data){
      body += data;
    });
    request.on('end',function(){
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`,`data/${title}`,function(){
        fs.writeFile(`data/${title}`,description,'utf-8',function(err){
        response.writeHead(302,{Location:`/?id=${title}`});
        response.end();
      });

      });
      // console.log(post);
    });
  }
  else if(pathname === '/delete_process'){
    var body='';
    request.on('data',function(data){
      body += data;
    });
    request.on('end',function(){
      var post = qs.parse(body);
      var id = post.id;
        fs.unlink(`data/${id}`,function(error){
          response.writeHead(302,{Location:`/`});
          response.end();
        });
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
왜, after가 출력되기도 전 에 done!이 먼저 출력되는 것일까요?

기본적으로 자바스크립트의 실행 환경은 프로그램의 실행을 최대한 막지 않는(non-blocking) 방식, 즉 비동기(asynchronous)로 코드를 실행해줍니다. 쉽게 말해, 나중에 실행해야 할 코드는 옆으로 잠깐 치워놓았다가, 당장 실행이 가능한 다음 코드를 먼저 처리 후에, 다시 때가되면 원래 코드를 실행해줍니다.

이러한 자바스크립트의 비동기 프로그래밍 모델은 브라우저와 같이 리소스가 제한된 환경에서 성능 상의 큰 강점을 나타냅니다. 하지만 개발자 입장에서는 코드가 순서대로 실행되지 않는듯한 착시 때문에 직관적으로 이해가 어려워 자바스크립트를 배우려는 많은 분들에게 큰 걸림돌로 작용하기도 합니다.

 */