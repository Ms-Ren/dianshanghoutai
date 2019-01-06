<template>
  <el-card class="card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col>
        <el-input
          @clear="getAll()"
          clearable
          placeholder="请输入用户名"
          v-model="query"
          class="input-with-select"
        >
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" @click="showAdd()">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table height="300" :data="tableData" style="width: 100%">
      <!-- create_time: (...)
        email: (...)
        id: (...)
        mg_state: (...)
        mobile: (...)
        role_name: (...)
      username:-->
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="120"></el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="100">
        <template slot-scope="scope">{{scope.row.create_time | fmtDate}}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="180">
        <template slot-scope="scope">
          <el-switch
            @change="changeState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            @click="edit(scope.row)"
            circle
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            @click="del(scope.row)"
            circle
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
           @click="editAdd(scope.row)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页  -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
         {{currUsername}}
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="currRoleId">
            <el-option disabled label="请选择" :value="-1"></el-option>

            <el-option v-for="(v,i) in roles" :key="i"
            :label="v.roleName" :value="v.id"></el-option>

          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="Rosel()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 2,
      total: -1,
      // 添加用户信息
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRole: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "120px",
      currUsername: "",
      currRoleId:-1,
      // 角色数据
      roles:[],
      currUserId:-1
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 修改角色
    async Rosel(){
      const res = await this.$http.put(`users/${this.currUserId}/role`,{
        rid: this.currRoleId
      })
      this.dialogFormVisibleRole = false
    },
    // 分配角色
    async editAdd(user) {
      console.log(user);
      
      // 显示对应的姓名
      this.currUsername = user.username;
      // 当前用户的Id
      this.currUserId = user.id;
      // 打开对话框
      this.dialogFormVisibleRole = true;
      // 获取数据
      const res = await this.$http.get(`roles`);
      const { meta: {msg,status},data}=res.data;
      if(status===200){
        // 获取data的数据
        this.roles = data;
      }
      console.log(res);
      // 根据用户id查询角色Id 
      const res2 = await this.$http.get(`users/${user.id}`);
      // console.log(res2);
      this.currRoleId = res2.data.data.rid;
      
    },
    // 修改用户状态
    async changeState(user) {
      // console.log(user);
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
    },
    // 修改用户信息
    async editUser() {
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      // console.log(res);

      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.dialogFormVisibleEdit = false;
        this.getTableData();
      } else {
        this.$message.warning(msg);
      }
    },
    // 编辑用户
    async edit(user) {
      // 打开编辑框
      this.dialogFormVisibleEdit = true;
      // 获取用户信息
      const res = await this.$http.get(`users/${user.id}`);
      console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 200) {
        this.form = data;
      }
    },
    // 删除用户信息
    del(users) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${users.id}`);
          // console.log(res);
          const {
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.pagenum = 1;
            this.getTableData();
            this.$message.success("删除成功！");
          } else {
            this.$message.warning(msg);
          }
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 点击确定时添加用户
    async addUser() {
      const res = await this.$http.post(`users`, this.form);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 201) {
        // 关闭对话框
        this.dialogFormVisibleAdd = false;
        // 刷新表格
        this.getTableData();
      } else {
        this.$message.warning(msg);
      }
    },
    // 添加用户时 打开对话框
    showAdd() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    // 输入框清空事件,清空时获取所有人
    getAll() {
      this.getTableData();
    },
    // 搜索用户
    searchUser() {
      this.pagenum = 1;
      this.getTableData();
    },
    async getTableData() {
      // 设置请求头 客户是否登录
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );

      // console.log(res);
      const {
        meta: { status, msg },
        data: { total, users }
      } = res.data;
      if (status === 200) {
        this.tableData = users;
        // console.log(this.tableData);
        this.total = total;
        // this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 每次条数改变时，从第一页显示
      this.pagenum = 1;
      this.pagesize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // val 当前页码
      this.pagenum = val;
      this.getTableData();
    }
  }
};
</script>

<style>
.card {
  height: 100%;
}
.input-with-select {
  margin-top: 20px;
  width: 350px;
}
</style>
