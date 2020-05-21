<template>
  <div class="userEdit">
    <el-dialog center :visible.sync="dialogVisible" width="600">
      <div slot="title" class="title">{{mode === 'add' ? "新增用户" : "修改用户"}}</div>
      <!-- 新增 -->
      <el-form :model="userForm" :rules="rules" ref="userEditFormRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="userForm.role_id" placeholder="请选择">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="userForm.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
          <el-input v-model="userForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer">
        <el-button @click="dialogVisible">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "userEdit",

  data() {
    return {
      dialogVisible: false,
      mode: "", //模式, add 代表新增 edit 代表修改
      userForm: {
        username: "", //用户名
        email: "", //邮箱
        phone: "", //手机号
        role_id: "", //角色 1.超级管理员 2.管理员 3.老师 4.学生
        status: "", // 状态-- 1：启用/ 2：禁用
        remark: "" //备注
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("邮件不能为空"));
              }
              const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
              if (!reg.test(value)) {
                return callback(new Error("邮件不合法,请输入正确邮件"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("手机号不能为空"));
              }
              //手机正则
              const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (!reg.test(value)) {
                return callback(new Error("手机号不合法"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        role_id: [
          { required: true, message: "请选择用户角色", trigger: "change" }
        ],
        status: [
          { required: true, message: "请选择用户状态", trigger: "change" }
        ],
        remark: [{ required: true, message: "备注不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit() {
      //做最后一次效验

      this.$refs.userEditFormRef.validate(async valid => {
        if(!valid) return;
        let res = null;
        if (this.mode === "add") {
          res = await this.$axios.post("/user/add", this.userForm);
        } else {
          //修改
        }
        //提示
        if (res.data.code == 200) {
          this.$message({
            message: this.mode === "add" ? "新增成功" : "编辑成功",
            type: "success"
          });
          //关闭当前对话框
          this.dialogVisible = false;
          //刷新父组件的数据
          //1.第一种方法 this.$emit();
          //2.第二种方法 this.$parent.search();
           this.$parent.search()
        } else {
          //提示错误
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less">
.userEdit {
  .title {
    height: 53px;
    text-align: center;
    color: #fff;
    background-color: #0e9cfa;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>