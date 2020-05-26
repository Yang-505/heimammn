<template>
  <div class="questionEdit">
    <el-dialog :visible.sync="dialogvisible">
      <div slot="title" class="title">{{mode === "add" ? '新增试题' : "修改试题"}}</div>
      <el-form :rules="rules" :model="questionForm" ref="questionFormRef" label-width="80px">
        <el-form-item label="学科">
          <el-select v-model="questionForm.subject" placeholder="请选择学科">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
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
        subject: ""
      },
      rules:{
          
      }
    };
  }
};
</script>

<style>
</style>