<template>
  <div class="container">
    <p>管理员{{userInfo.userName}}</p>
    <p>欢迎使用结构三维可视化健康系统。</p>
    <el-button type="danger" size="mini" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        userName: ""
      }
    };
  },
  components: {},
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push("login");
      this.$message.success("已退出登录");
    }
  },
  created() {
    this.userInfo.userName = localStorage.userName || "";
  }
};
</script>

<style>
.container {
  text-align: center;
}
</style>