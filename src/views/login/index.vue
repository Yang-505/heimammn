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
    <el-form class="login-form"
         :model="loginForm"

         :rules="rules">
        <el-form-item prop="phone">
          <!-- 手机号 -->
          <el-input
            v-model="loginForm.phone"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- 密码 -->
          <el-input 
           v-model="loginForm.password"
           prefix-icon="el-icon-lock"
           placeholder="请输入密码"
            ></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 验证码 -->
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="loginForm.code" prefix-icon="el-icon-lock" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img
                class="captcha"
                src="http://47.106.148.205/heimamm/public/captcha?type=login&random=0.5041014593676592"
                alt
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox></el-checkbox>我已阅读并同意
          <el-link type="primary" href="http://www.baidu.com">用户协议</el-link>和
          <el-link type="primary" href="http://www.baidu.com">隐试条款</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type="primary">登录</el-button>
        </el-form-item>
        <el-form-item label>
          <el-button style="width:100%" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 左侧图片 -->
    <div class="right">
      <img src="@/assets/login_bg.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        //模型
        phone: "", //手机号
        password: "", //密码
        code: "" //密码
      },
      rules: {
        //校验规则
        phone: [
          // //是一个数组,代表可以多个校验规则
          { required: true, message: "必须输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号必须是11位", trigger: "blur" },
        ],
        password:[
            { required: true, message: "必须输入密码", trigger: "blur" },
        ],
      }
    };
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