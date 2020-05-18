<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/login_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>

      <!-- form表单部分 -->
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" class="login-form">
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="18">
            <el-col :span="16">
              <el-input v-model="loginForm.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" :src="codeURL" @click="getCode" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck">
          <el-checkbox v-model="loginForm.isCheck"></el-checkbox>我已阅读并同意
          <el-link type="primary" href="http://www.baidu.com">用户协议</el-link>和
          <el-link type="primary" href="http://www.baidu.com">隐私条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click="loginClick" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 左侧图片 -->
    <div class="right">
      <img src="@/assets/login_bg.png" alt />
      <!-- 引入子组件 -->
      <register ref="refisterRef"></register>
    </div>
  </div>
</template>

<script>
//按需导入
import { setToken } from "@/utils/token.js";
//导入register子组件
import register from './register.vue'
export default {
  //注册
  components:{
    register
  },
  name: "Login",
  data() {
    return {
      //生成登录验证码
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      //模型
      loginForm: {
        phone: "18511111111", //手机号
        password: "12345678", //密码
        code: "", //验证码
        isCheck: true //是否勾选了用户协议
      },
      rules: {
        //校验规则
        phone: [
          //手机号
          // // //是一个数组,代表可以多个校验规则
          // { required: true, message: "必须输入手机号", trigger: "blur" },
          // { min: 11, max: 11, message: "手机号必须是11位", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              //非空判断
              if (!value) {
                return callback(new Error("手机号不能为空"));
              }
              const reg = /^1[3456789][0-9]{9}$/;
              if (!reg.test(value)) {
                return callback(new Error("手机号不合法"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        //密码
        password: [
          { required: true, message: "必须输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        //验证码
        code: [
          { min: 4, max: 4, message: "必须是4位", trigger: "blur" },
          { required: true, message: "必须输入验证码", trigger: "blur" }
        ],
        //勾选用户协议
        isCheck: [
          {
            validator: (rule, value, callback) => {
              //判断用户是否勾选
              // console.log('value is',value);
              if (!value) {
                return callback(new Error("请先勾选用户协议"));
              }
              callback();
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  //方法
  methods: {
    //获取验证码
    getCode() {
      this.codeURL =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=login$t" +
        Math.random() * 888;
    },
    //登录
    loginClick() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        // //发请求给后台进行登录
        // this.$axios.post("/login", this.loginForm).then(res => {
        //   if (res.data.code == 200) {
        //     this.$message({
        //       message: "登录成功~",
        //       type: "success"
        //     });
        //   }else{
        //     this.$message.error(res.data.message);
        //     this.codeURL = process.env.VUE_APP_BASEURL + "/captcha?type=login&t" + Math.random()
        //   }
        // });

        const res = await this.$axios.post("/login", this.loginForm);
        if (res.data.code == 200) {
          this.$message({
            message: "登录成功~",
            type: "success"
          });
          //保存token
          setToken(res.data.data.token);

          //跳转到后台管理页面(编程式导航)
          this.$router.push("/layout");
        } else {
          this.$message.error(res.data.message);
          this.codeURL =
            process.env.VUE_APP_BASEURL +
            "/captcha?type=login&t" +
            Math.random();
        }
      });
    },

    //注册
    register(){
      this.$refs.refisterRef.dialogVisible = true;
    }
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin-top: 29px;
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>