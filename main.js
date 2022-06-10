var http = require('http');
var fs = require('fs');
var url = require('url');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(request.url, true).query;
    var title = queryData.id;
    console.log(queryData.id);
    if(_url == '/' || _url == '/?'){
      title = 'Web';
      queryData.id='Index';
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }

    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`,'utf-8', function(err,description)
    {
      var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title} </title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=html">HTML</a></li>
          <li><a href="/?id=css">CSS</a></li>
          <li><a href="/?id=javascript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      
      response.end(template);
    });
   
    // console.log(__dirname + url);
  
     
   
    // response.end('egoing :'+ url);
 
});
app.listen(3000);

// JS는 혼자서 서버의 파일들을 수색할 수가 없음. 된다고하면 보안상의 무제가 더 커질거임.
