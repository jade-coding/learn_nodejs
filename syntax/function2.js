console.log(Math.round(2.5635656)); // 3
console.log(Math.round(1.4)); // 1

var val=sum(3,4);


function sum(a , b){
    return a+b;
    }
    
console.log("val 의 값은" + val); // val이 전역변수여도 함수빠져나올때는 값이 다 사라짐. 
