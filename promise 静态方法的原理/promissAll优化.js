const fs =require('fs')
//  fs 是一个node 中 file System 有文件的读写操作
//  node中异步方法都有回调 并发 同时去读取文件 读取完毕的时机不一样
//  并发操作 就是两个操作互不影响

function after (times,say){
    let renderObj ={};
    return function (key,value) {
        renderObj[key] = value;
        if(--times == 0){
            say(renderObj);
        }
    }
}

let out = after(2,(renderObj)=>{
    console.log(renderObj);
})

fs.readFile('文件路径','utf8',function (err,data){
    out('name',data);
})

fs.readFile('文件路径','utf8',function(err,data){
    out("name",data);
})