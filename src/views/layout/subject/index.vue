<template>
  <div>
    <!-- 搜索部分 -->
    <el-card>
      <el-form :model="searchForm" ref="searchFormRef" inline label-width="80px">
        <el-form-item label="学科编号" prop="rid">
          <el-input style="width:180px" v-model="searchForm.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科姓名" prop="name">
          <el-input style="width:180px" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input style="width:180px" v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select style="width:180px" v-model="searchForm.status" placeholder="请选择">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="primary">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表部分 -->
    <el-card style="margin-top:15px"></el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //模型
      searchForm: {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者
        status: "" //状态
      },
      page: 1, //页码
      limit: 2, //页容量
      subjectList: [], //学科列表数据
      total: 0 //总页数
    };
  },
  created() {
    this.getSubjectListData();
  },
  methods: {
   async getSubjectListData() {
        const res = await this.$axios.get('/subject/list',{
            params:{
                page:this.page,
                limit:this.limit,
                ...this.searchForm
            }
        });

        if(res.data.code === 200){
            this.subjectList = res.data.data.items; //学科列表数据
            this.total = res.data.data.pagination.total; //总页数
        }
    },
    //重新搜索
    search(){
        this.page = 1;

        this.getSubjectListData();
    },
    //清除
    clear(){
        this.$refs.searchFormRef.resetFields();

        this.search();
    }
  }
};
</script>