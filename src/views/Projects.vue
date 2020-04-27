<template>
  <div>
    <el-table
      :data="projects"
      stripe
      style="width: 100%;"
      :row-style="{height:0+'px'}"
      :cell-style="{padding:4+'px'}"
    >
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column
        prop="openStatus"
        label="状态"
        :formatter="formatStatus"
        :filters="[{ text: '已开放', value: true }, { text: '未开放', value: false }]"
        :filter-method="filterTag"
        width="80px"
      ></el-table-column>
      <el-table-column prop="structuralType" label="结构类型"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="100px" :formatter="formatTime"></el-table-column>
      <el-table-column prop="address" label="位置"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="viewProject(scope.row._id)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center;margin-top:20px">
      <el-pagination
        background
        layout="prev, pager, next"
        :pager-count="11"
        :page-size="pageSize"
        :total="total"
        @current-change="currentPageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
      pageSize: 15,
      pageNumber: 1,
      total: 0
    };
  },
  methods: {
    formatTime(row) {
      return row.createdTime.slice(0, 10);
    },
    formatStatus(row) {
      return row.openStatus === true ? "已开放" : "未开放";
    },
    filterTag(value, row) {
      return value === row.openStatus;
    },
    currentPageChange(val) {
      this.pageSize = this.pageSize;
      this.pageNumber = val;
      this.$http
        .get(
          `/project/list?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
        )
        .then(res => {
          this.projects = res.data;
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    viewProject(id) {
      this.$router.push(`/project/${id}`);
    }
  },
  created() {
    this.$http.get("/project/count").then(res => {
      this.total = res.data;
      this.$http
        .get(
          `/project/list?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`
        )
        .then(res => {
          this.projects = res.data;
        });
    });
  }
};
</script>

<style>
</style>