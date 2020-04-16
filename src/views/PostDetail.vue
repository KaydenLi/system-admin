<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{post.title}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="closePost">关闭</el-button>
      </div>
      <div class="title">发布时间：{{post.createTime}}</div>
      <div class="title">内容摘要：{{post.digest}}</div>
      <div id="post-content"></div>
      <div class="center-btn">
        <el-button type="primary" size="mini" @click="editPost(post._id)">修改</el-button>
        <el-button type="danger" size="mini" @click="deletePost(post._id)">删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {}
    };
  },
  methods: {
    closePost() {
      this.$router.push("/postlist");
    },
    deletePost(id) {
      this.$confirm("此操作将永久删除该通告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/post/delete/${id}`).then(res => {
            if (res.status === 200) {
              this.$message.success("删除成功");
            }
            window.console.log(res);
            this.$router.push("/postlist");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editPost(id){
        this.$router.push(`/editpost/${id}`);
    }
  },
  created() {
    this.$http.get(`/post/${this.$route.params.id}`).then(res => {
      this.post = res.data;
      var div = document.createElement("div");
      div.innerHTML = this.post.content;
      document.getElementById("post-content").appendChild(div);
    });
  }
};
</script>

<style>
.title {
  font-weight: 300;
  color: #909399;
}
.center-btn {
  text-align: center;
}
</style>