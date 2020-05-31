<template>
  <div>
    <el-table
      :data="projects"
      style="width: 100%"
      :row-style="{height:0+'px'}"
      :cell-style="{padding:4+'px'}"
    >
      <el-table-column prop="userName" label="申请人"></el-table-column>
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="createTime" :formatter="formatTime" label="申请时间"></el-table-column>
      <el-table-column prop label="申请理由">
        <el-button @click="pass(scope.row._id)" type="text" size="mini">详情</el-button>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="pass(scope.row._id)" type="primary" size="mini">通过</el-button>
          <el-button @click="refuse(scope.row._id)" type="danger" size="mini">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>>

<script>
export default {
  data() {
    return {
      projects: []
    };
  },
  methods: {
    pass(id) {
      this.$http.get(`waiting/auth/${id}`).then(res => {
        this.projects = res.data;
        this.$message.success("授权成功");
      });
    },
    refuse(id) {
      this.$confirm("确认拒绝用户申请，并移除该项目吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.get(`waiting/deny/${id}`).then(res => {
            this.projects = res.data;
            this.$message.success("已拒绝授权");
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    formatTime(row) {
      let time = row.createTime;
      let day = time.slice(0, 10);
      return day;
    }
  },
  created() {
    this.$http.get("/waiting/list").then(res => {
      this.projects = res.data;
      window.console.log(res.data);
    });
  }
};
</script>