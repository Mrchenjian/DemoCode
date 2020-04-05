// 1. index.js 进行原生的Promise
// 2. promise.js 进行自定义的Promise
// 3. test.js 是对promise.js进行测试
// 4. 开发过程结合promise/a+规范
/*
成功的回调和失败的回调都看可以返回一个结果
	情况1： 如果返回的是一个promise 那么会让这个promise执行 并且采用他的状态 将成功或失败的结果作为外层的下一个
	情况2： 如果返回的是一个普通值会把这个值作为外层的下一次then的成功的回调中
	情况3： 抛出一个异常
*/

new Promise((resolve, reject) => {
  resolve(1)
})
  .then(
    value => {
      return new Promise(resolve => {
        resolve(
          new Promise((resolve, reject) => {
            resolve('333')
          })
        )
      })
    },
    reason => {
      console.log('reason', reason)
    }
  )
  .then(
    value => {
      console.log('then 2 value: ', value)
    },
    reason => {
      console.log('reason', reason)
    }
  )
