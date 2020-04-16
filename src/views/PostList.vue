<template>
  <div>
    <el-table
      :data="postList"
      style="width: 100%"
      :row-style="{height:0+'px'}"
      :cell-style="{padding:4+'px'}"
    >
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="digest" label="摘要"></el-table-column>
      <el-table-column prop="createTime" :formatter="formatTime" label="发布时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="viewDetail(scope.row._id)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>>

<script>
export default {
  data() {
    return {
      postList: []
    };
  },
  methods: {
    viewDetail(id) {
      // window.console.log(id);
      this.$router.push(`/postdetail/${id}`);
    },
    formatTime(row) {
      let time = row.createTime;
      let day = time.slice(0,10);
      return day;
    }
  },
  created() {
    this.$http.get("/post/list").then(res => {
      this.postList = res.data;
    });
  }
};
</script>