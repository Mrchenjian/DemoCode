
//  try + catch  只能捕获同步异常 

class Promise {
  constructor(executor) {
    // 参数校检
    if (typeof executor !== 'function') {
      throw new TypeError(`Promise resolver ${executor} is not a function`)
    }

    this.initValue()
    this.initBind()

// executor 执行的时候 需要传入两个参数 给用户来改变状态的
    try {
      executor(this.resolve, this.reject)
    } catch (e) { // 表示当前有异常 那就使用这个异常作为promise失败的原因
      this.reject(e)
    }
  }

  // 绑定 this
  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  // 初始化值
  initValue() {
    this.value = null // 终值
    this.reason = null // 拒因
    this.state = Promise.PENDING // 状态
    this.onFulfilledCallbacks = [] // 成功回调
    this.onRejectedCallbacks = [] // 失败回调
  }

//  只有状态是等待态的时候 才可以变更新状态
  resolve(value) {
    // 成功后的一系列操作(状态的改变, 成功回调的执行)
    if (this.state === Promise.PENDING) {
      this.state = Promise.FULFILLED
      this.value = value
      this.onFulfilledCallbacks.forEach(fn => fn(this.value))
    }
  }

  reject(reason) {
    // 失败后的一系列操作(状态的改变, 失败回调的执行)
    if (this.state === 'pending') {
      this.state = Promise.REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach(fn => fn(this.reason))
    }
  }

  then(onFulfilled, onRejected) {
    // 参数校检
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function(value) {
        return value
      }
    }

    if (typeof onRejected !== 'function') {
      onRejected = function(reason) {
        throw reason
      }
    }

    // 实现链式调用, 且改变了后面then的值, 必须通过新的实例  jquery 返回的是当前的额this
	// promise 必须返回一个全新的promise 这样可以解决 promise的状态问题 否则可能会出现promise 刚开始成功 又变失败态
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === Promise.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            Promise.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.state === Promise.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            Promise.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.state === Promise.PENDING) {
        this.onFulfilledCallbacks.push(value => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value)
              Promise.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })

        this.onRejectedCallbacks.push(reason => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              Promise.resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })

    return promise2
  }
}

Promise.PENDING = 'pending'
Promise.FULFILLED = 'fulfilled'
Promise.REJECTED = 'reject'
Promise.resolvePromise = function(promise2, x, resolve, reject) {
  // 判断 可能你的promise要和别人的promise来混用
  // 可能不同的promise库之间要相互调用
  
  if (promise2 === x) {  // x 如果和 promise2 是同一个人 x 永远不能成功或者失败 所以就卡死了 我们需要直接报错即可
    reject(new TypeError('Chaining cycle detected for promise'))
  }

  let called = false
  if (x instanceof Promise) {
    // 判断 x 为 Promise
    x.then(
      value => {
        Promise.resolvePromise(promise2, value, resolve, reject)
      },
      reason => {
        reject(reason)
      }
    )
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // x 为对象或函数
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          value => {
            if (called) return
            called = true
            Promise.resolvePromise(promise2, value, resolve, reject)
          },
          reason => {
            if (called) return
            called = true
            reject(reason)
          }
        )
      } else {
        if (called) return
        called = true
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.defer = Promise.deferred = function() {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise
