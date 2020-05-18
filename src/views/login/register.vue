<template>
  <div class="register">
    <el-dialog center :visible.sync="dialogVisible">
      <div slot="title" class="title">注册</div>
      
        <el-form :model="registerForm" label-width="100px">
            <!-- 昵称 -->
            <el-form-item label="昵称">
                <el-input v-model="registerForm.username"></el-input>
            </el-form-item>   
            <!-- 邮箱 -->
            <el-form-item label="邮箱">
                <el-input v-model="registerForm.email"></el-input>
            </el-form-item>
            <!-- 手机 -->
            <el-form-item label="手机">
                <el-input v-model="registerForm.phone"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码">
                <el-input v-model="registerForm.password"></el-input>
            </el-form-item>
            <!-- 图形码 -->
            <el-form-item label="图形码">
                <el-row>
                    <el-col :span="17">
                        <el-input></el-input>                        
                    </el-col>
                    <el-col :span="6">
                        <img class="captcha" style="margin-left:10px" src="http://47.106.148.205/heimamm/public/captcha?type=sendsms" alt="">
                    </el-col>
                </el-row>
                
            </el-form-item>
            <!-- 验证码 -->
           <el-form-item label="验证码">
                <el-row>
                    <el-col :span="17">
                        <el-input v-model="registerForm.rcode"></el-input>                        
                    </el-col>
                    <el-col  style="margin-left:10px" :span="6">
                        <el-button>获取用户验证码</el-button>
                    </el-col>
                </el-row>     
            </el-form-item>
        </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name:"reg",
  data() {
    return {
      dialogVisible: false,
      //模型
      registerForm:{
          //这里面的数据,将来要给服务器
          username:"",//用户名
          phone:"",//手机号
          email:"",//邮箱
          avatar:"",// 头像地址
          password:"",//密码
          rcode:"",//验证码
      }
    };
  }
};
</script>

<style lang="less">
.register {
  .title {
    height: 53px;
    background: #03c0f9;
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .captcha {
    width: 100%;
    height: 40px;
  }
}
</style>