app.filter("reverse",function(){
    return function reverseString(str){
        return str.split("").reverse().join("");
    }
})