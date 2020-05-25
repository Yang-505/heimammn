<template>
  <div class="subject">
    <!-- 头部 -->
    <el-dialog center :visible.sync="dialogvisible" width="600px">
      <div slot="title" class="title">{{mode === "add" ? "新增用户" : "编辑用户"}}</div>
      <el-form :model="subjectForm" ref="subjectFormRef" :rules="rules" label-width="80px">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="subjectForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="subjectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="subjectForm.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="subjectForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
          <el-input v-model="subjectForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer">
        <el-button @click="dialogvisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogvisible: false, //控制对话框显示或者隐藏
      mode: "", //代表的操作类型 add: 新增 edit: 编辑
      //模型
      subjectForm: {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //备注
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入学科简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入学科简介", trigger: "blur" }],
        remark: [{ required: true, message: "请输入学科备注", trigger: "blur" }]
      }
    };
  },
  //监听
  watch:{
      dialogvisible(newValue){
         if(!newValue) {
             this.$refs.subjectFormRef.clearValidate();
         }
      }
  },
  methods: {
    //最后一次效验
    submit() {
      this.$refs.subjectFormRef.validate(async valid => {
        if (!valid) return;

        let res = null;
        if (this.mode === "add") {
          //新增
          res = await this.$axios.post("/subject/add", this.subjectForm);
        } else {
          //修改
          res = await this.$axios.post("/subject/edit", this.subjectForm);
        }

        if (res.data.code === 200) {
          //提示
          this.$message({
            type: "success",
            message: this.mode === "add" ? "新增成功" : "编辑成功"
          });

          //关闭当前对话框
          this.dialogvisible = false;

          //调用父组件的search方法
          this.$parent.search();
        }
      });
    }
  }
};
</script>

<style lang="less">
.subject {
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