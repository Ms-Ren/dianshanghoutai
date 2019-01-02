<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="3">
          <div class="grid-content">
            <img src="@/assets/logo.png" alt="图片无法显示">
          </div>
        </el-col>
        <el-col :span="19">
          <div class="bg-purple-light">
            <h2>电商后台管理系统</h2>
          </div>
        </el-col>
        <el-col :span="1" id="bg-purple">
          <a href="#" @click.prevent="handleLoginout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu unique-opened default-active="2">
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-3">
              <i class="el-icon-info"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <!-- 2 -->
           <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-3">
              <i class="el-icon-info"></i>
             角色列表
            </el-menu-item>
            <el-menu-item index="1-4">
              <i class="el-icon-info"></i>
             权限列表
            </el-menu-item>
          </el-submenu>
          <!-- 3 -->
           <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-3">
              <i class="el-icon-info"></i>
             商品列表
            </el-menu-item>
            <el-menu-item index="1-3">
              <i class="el-icon-info"></i>
             分类参数
            </el-menu-item>
            <el-menu-item index="1-3">
              <i class="el-icon-info"></i>
             商品分类
            </el-menu-item>
          </el-submenu>
          <!-- 4 -->
           <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-3">
              <i class="el-icon-info"></i>
              订单列表
            </el-menu-item>
          </el-submenu>
          <!-- 5 -->
           <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-3">
              <i class="el-icon-info"></i>
              数据列表
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 如果 token 就渲染home
  // 反之 就不渲染
beforeCreate() {
  if(!localStorage.getItem("token")){
    this.$message.warning("请先登录")
    this.$router.push({
      name: "login"
    })
  }
},
  // 退出方法
 methods: {
    handleLoginout() {
    // 清除token
    localStorage.clear();
    // 回到登录组件
    this.$router.push({
      name: "login"
    });
    // 提示
    this.$message.success("退出成功")
  }
 },
};
</script>

<style>
.container {
    height: 100%;
    
}
.header {
  background-color: #b3c0d1;
}
.bg-purple-light {
  text-align: center;
  color: #fff;
  line-height: 60px;
}
#bg-purple a {
  text-decoration: none;
  line-height: 60px;
}
</style>
