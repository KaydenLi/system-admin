<template>
  <div>
    <el-row>
      <el-col
        class="border"
        :xs="{span: 24, offset: 0}"
        :sm="{span: 20, offset: 2}"
        :md="{span: 20, offset: 2}"
        :lg="{span: 18, offset: 3}"
        :xl="{span: 18, offset: 3}"
      >
        <div v-if="status">
          <el-card :body-style="{ padding: '0px' }" v-for="banner in banners" :key="banner._id">
            <img class="img" :src="banner.img" alt />
            <div style="padding: 14px;">
              <span>{{banner.title}}</span>
              <div class="bottom clearfix">
                <time class="time">首发时间：{{ banner.createTime.slice(0,10) }}</time>
                <el-button
                  type="danger"
                  size="mini"
                  class="button"
                  @click="deleteBanner(banner._id)"
                >删除</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  class="button"
                  @click="editBanner(banner._id)"
                >编辑</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <div v-else>暂时没有轮播图</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: []
    };
  },
  computed: {
    status: function() {
      if (this.banners.length > 0) return true;
      else {
        return false;
      }
    }
  },
  methods: {
    deleteBanner(id) {
      this.$confirm("此操作将永久删除该轮播图, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/banner/delete/${id}`).then(res => {
            this.$message.success("删除成功轮播图");
            this.banners = res.data;
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    editBanner(id) {
      this.$router.push(`/banneredit/${id}`);
    }
  },
  created() {
    this.$http.get("/banner/list").then(res => {
      this.banners = res.data;
    });
  }
};
</script>

<style>
.no-banner {
  text-align: center;
  color: #909399;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  float: right;
  margin: 0 10px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.img {
  width: 100%;
}
.el-card {
  margin: 20px 0;
}
</style>