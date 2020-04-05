// after 在 ... 之后
//  我希望我调用某个函数 3次之后 再去执行

function after(time,say){
    return function () {
        if((--time) == 0) {
            say();
        }
    }
}

let nweSay = after(3,function say() {
    //  保存一个变量  到after的内部
    console.log('say');
})

nweSay();
nweSay();
nweSay();
