<template>
  <div class="questionEdit">
    <el-dialog :visible.sync="dialogvisible" fullscreen>
      <div slot="title" class="title">{{mode === "add" ? '新增试题' : "修改试题"}}</div>
      <el-form
        class="form"
        :rules="rules"
        :model="questionForm"
        ref="questionFormRef"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="学科" prop="subject">
          <el-select v-model="questionForm.subject" class="selectWidth" placeholder="请选择学科">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select v-model="questionForm.step" placeholder="请选择阶段">
            <el-option v-for="item in stepObj"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          
        </el-form-item>       
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "QuestionEdit",
  props: {
    subjectList: Array,
    enterpriseList: Array,
    stepObj: Object,
    typeObj: Object,
    difficultyObj: Object
  },
  data() {
    return {
      mode: "", //add 新增 edit 修改
      //对话框显示/隐藏
      dialogvisible: false,
      questionForm: {
        //这个里面的所有值,将来是传递给服务器的
        subject: "", //学科
        step:"", //阶段
        enterprise:"", //企业
        city:[], //城市
        type:"1", //题型
        difficulty:"1", //难度
      },
      rules: {
        subject:{ required: true, message: '请选择学科', trigger: 'blur' },
        step:{ required: true, message: '请选择阶段', trigger: 'blur' },
      }
    };
  }
};
</script>
<style lang="less">
.questionEdit {
  .title {
    color: #fff;
    padding-left: 15px;
    height: 54px;
    line-height: 54px;
    background-color: #04bcfa;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .form {
    width: 832px;
    margin: 0 auto;
  }
  .selectWidth {
    width: 300px;
  }
}
</style>