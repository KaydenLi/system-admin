<template>
  <div class="container">
    <p>欢迎管理员，{{userInfo.userName}}</p>
    <el-button type="primary" size="mini">编辑信息</el-button>
    <el-button type="danger" size="mini" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        userName: "KaydenLi"
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
  created() {}
};
</script>

<style>
.container {
  text-align: center;
}
</style>