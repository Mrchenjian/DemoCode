const Mock = require('mockjs')
let id =Mock.mock('@guid')
console.log(id);

let obj=Mock.mock({
    id: '@id()',
    username: '@cname()',
    date: '@date()',
    avatar: "@image('200x200','red','#3034','陈健')"
})

console.log(obj);
