<template>
  <div class="register">
    <el-dialog center :visible.sync="dialogVisible">
      <div slot="title" class="title">注册</div>

      <el-form :rules="rules" :model="registerForm" label-width="70px">
        <!-- 头像 -->
        <!-- <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>-->
        <!-- 昵称 -->
        <el-form-item prop="username" label="昵称">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item prop="phone" label="手机">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <!-- 图形码 -->
        <el-form-item prop="code" label="图形码">
          <el-row>
            <el-col :span="17">
              <el-input v-model="registerForm.code"></el-input>
            </el-col>
            <el-col :span="6">
              <img
                class="captcha"
                style="margin-left:10px"
                src="http://47.106.148.205/heimamm/public/captcha?type=sendsms"
                alt
              />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="rcode" label="验证码">
          <el-row>
            <el-col :span="17">
              <el-input v-model.number="registerForm.rcode"></el-input>
            </el-col>
            <el-col style="margin-left:10px" :span="6">
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
  name: "reg",
  data() {
    return {
      //生成登录验证码
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      dialogVisible: false,
      imageUrl: "", //
      //模型
      registerForm: {
        //这里面的数据,将来要给服务器
        username: "", //用户名
        phone: "", //手机号
        email: "", //邮箱
        avatar: "", // 头像地址
        password: "", //密码
        code: "", //图形码
        rcode: "" //验证码
      },
      rules: {
        //效验规则
        //用户名
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        //头像
        // avatar:[
        //     {
        //         required:true,message:"头像不能为空",trigger:"blur"
        //     }
        // ],
        //邮箱
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("邮箱不能为空"));
                return;
              }
              const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
              if (!reg.test(value)) {
                return callback(new Error("邮箱不合法"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        //手机号
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("手机号不能为空"));
              }
              //手机正则
              const reg = /^1[3456789][0-9]{9}$/;
              if(!reg.test(value)){
                  return callback(new Error('手机号不合法'));
              };
              callback();
            },
            trigger: "blur"
          },
        ],
        //密码
        password:[
            { required:true, message:'密码不能为空', trigger:"blur" },
            { min:6, message:"密码长度最小是6位", trigger:"blur" }
        ],
        //图形码
        code:[
            { required:true, message:"图形码不能为空", trigger:"blur" },
            { min:4, max:4, message:"图形码必须是4位", trigger:"blur" }
        ],
        //验证码
        rcode:[
           {
               required:true,
               validator:(rule,value,callback)=>{
                   if(!value){
                       return callback(new Error('验证码不能为空'));
                   };
                   if(!Number.isInteger(value)){
                       return callback(new Error('验证码必须是数字'));
                   }
                   callback();
               },
               trigger:"blur"
           },
        ],

      },
    };
  },
  methods: {
    //     //
    //     handleAvatarSuccess(res, file) {
    //          //给imgUrl赋值
    //          this.imageUrl = process.env.VUE_APP_BASEURL + '/' + res.data.file_path;
    //          //给registerForm中的avatar模型赋值
    //          this.registerForm.avatar = res.data.file_path;
    //     },
    //     //图片上传之前
    //     beforeAvatarUpload(file) {
    //       const isJPG = file.type === "image/jpeg";
    //       const isLt2M = file.size / 1024 / 1024 < 2;
    //       if (!isJPG) {
    //         this.$message.error("上传头像图片只能是 JPG 格式!");
    //       }
    //       if (!isLt2M) {
    //         this.$message.error("上传头像图片大小不能超过 2MB!");
    //       }
    //       return isJPG && isLt2M;
    //     }
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
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>