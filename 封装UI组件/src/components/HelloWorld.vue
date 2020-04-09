<template>
  <div>
    <button @click="check">点击查看效果</button>
  </div>
</template>

<script>

export default {
    methods:  {
      check(){
          this.$toast('网络异常','top')
      }
    }
}
</script>

<style>
    #app{ 
      font-family:'Avenir',Helvetica,Arial,sans-serif;
       -webkit-font-smoothing:antialiased;
        -moz-osx-font-smoothing:grayscale; 
        text-align:center; 
        color:口#2c3e50; 
        margin-top:60px;
    }
    .vue-toast{ 
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      display:inline-block;
       font-size:12px; 
       border:1px solid 口green;
       color:□green; 
       border-radius:4px;
       padding:4px 6px;
    }
    .toast-top{
      top: 30px;
    }
    
</style>