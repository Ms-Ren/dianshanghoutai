<template>
  <div id="wrap">
    <el-form class="form" label-position="top"  label-width="80px" :model="formdata">
       <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
       <el-button @click="handleLogin()" type="primary" class="btn">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
    // console.log( this.$http);
      const res = await this.$http.post('login', this.formdata)
      const {
        data: {
          meta: { msg, status },
          data
        }
      } = res
      if (status === 200) {
        //  this.$message.success(msg)
        localStorage.setItem('token', data.token)
        this.$router.push({
          name: 'home'
        })
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>
<style>
#wrap {
  height: 100%;
  /* 取色计 */
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}

#wrap .form {
  background-color: #ffffff;
  border-radius: 10px;
  width: 400px;
  padding: 30px;
}

#wrap .form .btn {
  width: 100%;
}
</style>
