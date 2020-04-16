<template>
  <div>
    <el-table
      :data="admins"
      stripe
      style="width: 100%;"
      :row-style="{height:0+'px'}"
      :cell-style="{padding:4+'px'}"
    >
      <el-table-column prop="userName" label="管理员"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间" :formatter="formatDate"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="viewAdmin(scope.row)" type="primary" size="mini">查看</el-button>
          <el-button @click="deleteAdmin(scope.row._id)" type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admins: []
    };
  },
  methods: {
    formatDate(row) {
      return row.createdTime.slice(0, 10);
    },
    deleteAdmin(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/admin/delete/${id}`).then(res => {
            this.admins = res.data;
          });
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    }
  },
  created() {
    this.$http.get("/admin/list").then(res => {
      this.admins = res.data;
    });
  }
};
</script>

<style>
</style>