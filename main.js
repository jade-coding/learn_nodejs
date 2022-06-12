var http = require('http');
var fs = require('fs');
var url = require('url');
var dirlist = new Array();

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

  
if(pathname ==='/'){
  if(queryData.id === undefined){
    var title ="Web";
    queryData.id = 'Index'; 
    fs.readdir('./data',function(err,filelist){   // 이 구문을 벗어나면 filelist 값들을 전달받은 전역변수 dirlist의 메모리에서 다 사라짐.. 
      // console.log(filelist); checkcode
      dirlist = filelist;
      // console.log(dirlist.length); checkcode
    });
  }
 
  var list = '<ul>';
  var i = 0;
  console.log(dirlist[1] +"이거 사실이니??");
    while(i<dirlist.length){
      list = list + `<li><a href="/id= ${dirlist[i]}"> ${dirlist[i]}</a></li>`;
      i++;
  }
  list += '</ul>';
  console.log(list +'hello?');



};//tmp

//   fs.readFile(`data/${queryData.id}`,'utf-8', function(err,description)
//     {
//       var template = `
//       <!doctype html>
//       <html>
//       <head>
//         <title>WEB1 - ${title} </title>
//         <meta charset="utf-8">
//       </head>
//       <body>
//         <h1><a href="/">WEB</a></h1>
//         ${list}
//         <h2>${title}</h2>
//         <p>${description}</p>
//       </body>
//       </html>
//       `;
      
//       response.writeHead(200);
//       response.end(template);
//     });
// }
// else{
//   response.writeHead(404);
//   response.end('Not found');
// }
  
    
//     // console.log(__dirname + url);
  
     
   
//     // response.end('egoing :'+ url);
 
});//create server end state;
app.listen(3000);

// JS는 혼자서 서버의 파일들을 수색할 수가 없음. 된다고하면 보안상의 무제가 더 커질거임.
