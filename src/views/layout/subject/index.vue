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
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表部分 -->
    <el-card style="margin-top:15px">
      <el-table :data="subjectList" border stripe>
        <el-table-column border stripe>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="学科编号" prop="rid"></el-table-column>
          <el-table-column label="学科名称" prop="name"></el-table-column>
          <el-table-column label="简称" prop="short_name"></el-table-column>
          <el-table-column label="创建者" prop="username"></el-table-column>
          <el-table-column label="创建日期" prop="create_time" width="180"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span
                :style="{color: scope.row.status === 0 ? 'red' : '#6ac144'}"
              >{{scope.row.status === 0 ? "禁用" : "启用"}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button type="primary" @click="editSubject(scope.row)">编辑</el-button>
              <el-button
                :type="scope.row.status === 0 ? 'success' : 'info'"
                @click="changeStatus(scope.row.id)"
              >{{scope.row.status === 0 ? "启用" : "禁用"}}</el-button>
              <el-button type="danger" @click="del(scope.row.id,scope.row.username)">删除</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="margin-top:15px; text-align:center">
        <el-pagination
          @size-change="SizeChange"
          @current-change="CurrentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 15]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <subject-edit ref="subjectEditRef"></subject-edit>
  </div>
</template>
<script>
import SubjectEdit from "./subject-add-or-update";
export default {
  components: {
    //局部注册
    "subject-edit": SubjectEdit
  },
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
      const res = await this.$axios.get("/subject/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm
        }
      });

      if (res.data.code === 200) {
        this.subjectList = res.data.data.items; //学科列表数据
        this.total = res.data.data.pagination.total; //总页数
      }
    },
    //重新搜索
    search() {
      this.page = 1;

      this.getSubjectListData();
    },
    //清除
    clear() {
      this.$refs.searchFormRef.resetFields();

      this.search();
    },

    //更改状态
    async changeStatus(id) {
      const res = await this.$axios.post("/subject/status", { id });
      if (res.data.code === 200) {
        //提示
        this.$message({
          type: "success",
          message: "更新状态成功~"
        });

        //刷新表格
        this.getSubjectListData();
      }
    },
    //当前的页码发生了改变
    CurrentChange(val) {
      // console.log(val);
      this.page = val;

      this.getSubjectListData();
    },
    //分页条的页容量发生了改变,如果是页容量发生了改变我们要从第一页开始加载
    SizeChange(val) {
      // console.log(val);
      this.limit = val;
      this.search();
    },

    //删除
    del(id, username) {
      // console.log(id);
      this.$confirm(`确定删除${username}该用户吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/subject/remove", { id });
          if (res.data.code === 200) {
            //提示
            this.$message({
              type: "success",
              message: "删除成功~"
            });

            //刷新表格
            this.search();
          }
        })
        .catch(() => {});
    },

    //新增学科
    add() {
      this.$refs.subjectEditRef.mode = "add";
      this.$refs.subjectEditRef.dialogvisible = true;
    },
    //编辑学科
     editSubject() {},
  }
};
</script>