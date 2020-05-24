<template>
  <div class="enterprise">
    <el-dialog center :visible.sync="dialogvisible" width="600px">
      <div class="title" slot="title">{{mode === 'add' ? '新增企业' : '修改企业'}}</div>
      <!-- 表单 -->
      <el-form ref="enterpriseFormRef" :rules="rules" :model="enterpriseForm" label-width="80px">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="enterpriseForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="enterpriseForm.name"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name">
          <el-input v-model="enterpriseForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro">
          <el-input v-model="enterpriseForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" prop="remark">
          <el-input v-model="enterpriseForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer">
        <el-button @click="dialogvisible =false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogvisible: false,
      mode: "", // 新增(add) & 修改(edit)
      enterpriseForm: {
        //提交给后台的数据
        eid: "", //企业id
        name: "", //企业名称
        short_name: "", //企业简称
        intro: "", //企业简介
        remark: "" //备注
      },
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        intro: [
          { required: true, message: "企业简介不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "企业备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //新增 & 修改最终点击确定调用的方法
    submit() {
      //做最后一次效验
      this.$refs.enterpriseFormRef.validate(async valid => {
        if (!valid) return;
        let res = null;
        if (this.mode === "add") {
          res = await this.$axios.post("/enterprise/add", this.enterpriseForm);
        } else {
          //修改
          res = await this.$axios.post('/enterprise/edit',this.enterpriseForm);
        }
        //提示
        if (res.data.code === 200) {
          this.$message({
            type: "success",
            message: this.mode === "add" ? "新增成功" : "修改成功"
          });
          //关闭点前对话框
          this.dialogvisible = false;
          //刷新父组件的数据
          this.$emit("search");
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
.enterprise {
  .title {
    text-align: center;
    color: #fff;
    background-color: #0e9ff9;
    height: 53px;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>