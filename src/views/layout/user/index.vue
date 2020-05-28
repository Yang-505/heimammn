<template>
  <div class="user">
    <!-- 搜索部分 -->
    <el-card>
      <el-form inline ref="searchFormRef" label-width="80px" :model="searchForm">
        <el-form-item label="用户名称" prop="username">
          <el-input style="width:150px" v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input style="width:150px" v-model="searchForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="searchForm.role_id" placeholder="请选择">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type="default" @click="clear">清除</el-button>
          <el-button type="primary" @click="add">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容部分 -->
    <el-card style="margin-top:20px">
      <!-- 表格 -->
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" style="color:red;">禁用</span>
            <span v-if="scope.row.status === 1" style="color:#6ac144">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary" @click="editUser(scope.row)">编辑</el-button>
            <!-- <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >{{scope.row.status === 0 ? '启用' : '禁用'}}</el-button>-->
            <el-button
              @click="changeStatus('/user/status',scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >{{scope.row.status === 0 ? '启用' : '禁用'}}</el-button>
            <!-- <el-button type="default" @click="deleteUser(scope.row.id,scope.row.username)">删除</el-button> -->
            <el-button type="default" @click="del('/user/remove',scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div style="margin-top:15px; text-align:center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 15, 20, 25]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <UserEdit ref="userEditRef" @editok="search" :mode="mode"></UserEdit>
      </div>
    </el-card>
  </div>
</template>  

<script>
/* 导入子组件 */
import UserEdit from "./user-add-or-update";
/* 导入混入对象 */
import common from "@/mixins/common";
export default {
  mixins: [common],
  name: "user",
  //注册
  components: {
    UserEdit
  },
  name: "userlist",
  data() {
    return {
      //模型
      searchForm: {
        username: "", //昵称
        email: "", //邮箱
        role_id: "" //角色数字, 1.超级管理员 2.管理员 3.老师 4.学生
      },
      page: 1, //页码
      limit: 5, //查询时候的页容量(每页查询多少条)
      userList: [], //展示用户列表所需的数据
      total: 0, //总条数,分页时候用的着
      mode: "add"
    };
  },

  created() {
    //获取用户列表数据,用于内容展示
    this.getListData();
  },
  methods: {
    // 用户列表数据,用于内容展示
    async getListData() {
      const res = await this.$axios.get("/user/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm
          //相对于
          // username:this.username,
          // email:this.email,
          // role_id:this.role_id
        }
      });
      // console.log(res.data);
      if (res.data.code == 200) {
        this.userList = res.data.data.items;

        this.total = res.data.data.pagination.total;
      }
    },
    //每页条数
    handleSizeChange(val) {
      this.limit = val;
      this.search();
    },
    //当前页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;

      this.getListData();
    },

    //搜索
    search() {
      this.page = 1; //从第一页开始
      this.getListData();
    },
    //清除
    clear() {
      // this.searchForm.username = '';
      // this.searchForm.email = '';
      // this.searchForm.role_id = '';
      //前提: 我们form表单 el-form-item 上面必须设置prop
      this.$refs.searchFormRef.resetFields();

      this.search();
    },
    //操作启用/禁用
    // async changeStatus(id) {
    //   const res = await this.$axios.post("/user/status", { id });
    //   if (res.data.code == 200) {
    //     this.$message({
    //       message: "更新状态成功~",
    //       type: "success"
    //     });
    //   }
    //   //重新查询
    //   this.search();
    // },
    //删除用户
    // deleteUser(id, username) {
    //   this.$confirm(`确定要删除${username}该用户吗?`, "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       const res = await this.$axios.post("/user/remove", { id });
    //       if (res.data.code == 200) {
    //         this.$message({
    //           type: "success",
    //           message: "删除成功!"
    //         });
    //         //重新查询
    //         this.search();
    //       }
    //     })
    //     .catch(() => {});
    // },
    //新增用户
    add() {
      // 让新增用户的对话框显示出来;
      this.$refs.userEditRef.userForm = {
        username: "", // 用户名
        email: "", // 邮箱
        phone: "", // 手机号
        role_id: "", // 角色 1：超级管理员 2：管理员 3：老师 4：学生
        status: "", // 状态 1：启用 0：禁用
        remark: "" // 备注
      };

      this.mode = "add";
      this.$refs.userEditRef.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.userEditRef.$refs.userEditFormRef.clearValidate();
      });
    },
    //修改用户
    editUser(row) {
      console.log(row);
      this.mode = "edit";
      this.$refs.userEditRef.userForm = JSON.parse(JSON.stringify(row));
      this.$refs.userEditRef.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.userEditRef.$refs.userEditFormRef.clearValidate();
      });
    }
  }
};
</script>