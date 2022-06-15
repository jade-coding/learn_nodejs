var fs=require('fs');
    
//readFildSync
//sample.txt는 단순한 문자 B만 담겨져 있는 txt파일임.


console.log('A');
var result = fs.readFileSync('syntax/sample.txt','utf8');
console.log(result);
console.log('C');

//결과는 A,B,C


//readfile async

console.log('A');
fs.readFile('syntax/sample.txt','utf8',function(err,result){
    console.log(result);
});
console.log('C');

//결과는 A,C,B
