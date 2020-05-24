 <template>
  <div>
    <el-card>
      <!-- 搜索部分 -->
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="80px">
        <el-form-item label="企业编号" prop="eid">
          <el-input style="width:150px;" v-model="searchForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input style="width:150px;" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input style="width:150px;" v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="status">
          <el-select style="width:150px;" v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1"></el-option>
            <el-option label="禁用" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="add">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:15px;">
      <!-- 列表和分页部分 -->
      <el-table :data="enterpriseList" border stripe>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="200"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              :style="{ color: scope.row.status === 0 ? 'red' : '#87cd67' }"
            >{{ scope.row.status === 0 ? "禁用" : "启用" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary" @click="editEnterprise(scope.row)">编辑</el-button>
            <el-button
              @click="scopeClick(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >{{scope.row.status === 0 ? '启用' : '禁用'}}</el-button>
            <el-button @click="del(scope.row.id,scope.row.username)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:15px;text-align:center;">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        ></el-pagination>
      </div>
    </el-card>
    <!--  -->
    <EnterpriseEdit ref="enterpriseEditRef" @search="search"></EnterpriseEdit>
  </div>
</template>

<script>
//导入子组件
import EnterpriseEdit from "./enterprise-add-or-update";
export default {
  components: {
    //局部注册
    EnterpriseEdit
  },
  name: "EnterPrise",
  data() {
    return {
      searchForm: {
        eid: "", // 企业编号
        name: "", // 企业名称
        username: "", // 创建者
        status: "" // 状态
      },
      page: 1, // 页码
      limit: 2, // 页容量
      enterpriseList: [], // table展示所需要的数据
      total: 0 // 总条数
    };
  },
  created() {
    this.getEnterpriseListData();
  },
  methods: {
    async getEnterpriseListData() {
      const res = await this.$axios.get("/enterprise/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm
        }
      });
      if (res.data.code === 200) {
        this.enterpriseList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    // 查询
    search() {
      this.page = 1;
      this.getEnterpriseListData();
    },
    // 清除
    clear() {
      this.$refs.searchFormRef.resetFields();
      this.search();
    },
    // 页容量发生改变
    sizeChange(val) {
      this.limit = val;
      this.search();
    },
    // 当前页码发生了改变
    currentChange(val) {
      this.page = val;
      this.getEnterpriseListData();
    },
    //更改状态
    async scopeClick(id) {
      // console.log(id);
      const res = await this.$axios.post("/enterprise/status", { id });
      if (res.data.code === 200) {
        this.$message({
          message: "更新状态成功~~",
          type: "success"
        });
      }
      //重新查询
      this.search();
    },
    //删除
    del(id, username) {
      this.$confirm(`确定要删除该数据吗${username}该用户吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/enterprise/remove", { id });
          if (res.data.code === 200) {
            this.$message({
              message: "删除成功",
              type: "success"
            });

            //重新查询
            this.search();
          }
        })
        .catch(() => {});
    },
    //新增企业
    add() {
      this.$refs.enterpriseEditRef.mode = "add";
      this.$refs.enterpriseEditRef.enterpriseForm = {
        eid:"",//企业编号
        name:"", //企业名称
        short_name:"", //企业简称
        intro:"", //企业简介
        remark:"", //备注
      }
      this.$refs.enterpriseEditRef.dialogvisible = true;
    },
    //修改企业
    editEnterprise(row) {
      // console.log(row);
      const { id, eid, intro, name, short_name, remark } = row;
      this.$refs.enterpriseEditRef.enterpriseForm = {
        id,
        eid,
        name,
        short_name,
        intro,
        remark
      };
      this.$refs.enterpriseEditRef.mode = "edit";
      this.$refs.enterpriseEditRef.dialogvisible = true;
    }
  }
};
</script>