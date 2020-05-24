<template>
  <div>我是父组件
      <hr> <br/> 
       <MyTable :data="enterpriseList">
           <template slot-scope="scope">
               <el-button  :style="{color:scope.row.status === 0 ? 'red' : 'green'}">
                   {{scope.row.status === 0 ? '禁用' : '启用'}}
               </el-button>
           </template>
          
           
       </MyTable>
  </div>
 
</template>

<script>
import MyTable from './MyTable'
export default {
    //注册
    components:{
        MyTable
    },
    data() {
        return {
            enterpriseList:[
                {id:1,name:'腾讯',address:'腾讯公司',status:1},
                {id:2,name:'华为',address:'华为手机',status:0},
                {id:3,name:'大疆',address:'无人机',status:0},
            ]
        }
    },
}
</script>

<style>

</style>