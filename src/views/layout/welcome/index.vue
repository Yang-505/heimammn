<template>
  <div>
     {{$store.getters.getUserInfo.username}}欢迎您,您的角色是{{$store.getters.getUserInfo.role}}
     <br /> 
     <el-button type="primary" @click="changeModel">更改模型的值</el-button>
     
  </div>
</template>
<script>
export default {
  name:'Welcome',
  data() {
    return {
      
    }
  },
  methods:{
    changeModel(){
      
    }
  }
}
</script>
    
