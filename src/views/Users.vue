<template>
  <div>
    <el-table
      :data="users"
      stripe
      style="width: 100%;"
      :row-style="{height:0+'px'}"
      :cell-style="{padding:4+'px'}"
    >
      <el-table-column prop="userName" label="用户"></el-table-column>
      <el-table-column prop="createdTime" label="注册时间" :formatter="formatTime"></el-table-column>
      <el-table-column prop="adminFlag" label="管理员" :formatter="formatAdmin"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="address" label="用户地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  methods: {
    formatTime(row) {
      return row.createdTime.slice(0, 10);
    },
    formatAdmin(row) {
      return row.adminFlag === true ? "是" : "否";
    }
  },
  created() {
    this.$http.get("/user/list").then(res => {
      this.users = res.data;
    });
  }
};
</script>

<style>
</style>