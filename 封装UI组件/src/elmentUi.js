/*
 * @Author: mikey.chenjian
 * @Date: 2020-04-09 10:41:50 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-04-09 12:20:16
 */

/**
 * tips 是组件的内容
 * option 设置类名
 * type 设置组件的位置
 * */ 
let  Toast ={}
Toast.install = function (Vue,option){  
    // Vue 传的Vue的实例    把VUE传进来
    let opt = {
        defaultType: 'center', // 默认显示的位置
        duration: '1500'        // 默认持续的时间
    }
    for(let property in option){
            opt[property] = option[property]   // 用户传过来的值 替换掉默认值
    }
    Vue.prototype.$toast =(tips,type) =>{  // 挂载到Vue 
        if (type){
            opt.defaultType=type
        }

        // 如果当前页面组件已经出现了 就不展示
        if(document.getElementsByClassName('vue-toast').length){
                return
        }
        //  VUe 扩展  出含有 html 结构的  原本不属于vue的实例的东西扩展出来
        let ToastTpl =Vue.extend({
            // 当用户不传值  就用默认样式
            // ${tips} 是内容
            template: `<div class='vue-toast toast-${opt.defaultType}'>${tips}</div>`
        })
        let tpl = new ToastTpl().$mount().$el  // 把当前模板挂载到 其他的dom 结构上
        document.body.appendChild(tpl)
        //当前组件 要在任何页面都显示 设置为全局组件
        // setTimeout(()=>{
        //     document.body.removeChild( tpl)
        // },opt.duration)   // 当前组件在页面显示的时间  默认 1500毫秒
    }
        // 让用户可以手动选择
        ['bottom','center','top'].forEach(type =>{
            // type 设置 当前组件位置
            Vue.prototype.$toast[type]=(tips)=>{

                return Vue.prototype.$toast(tips,type)
            }
        })
}


export {
    Toast
}