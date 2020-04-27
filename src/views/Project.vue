<template>
  <div>
    <el-page-header @back="goBack" content="项目详情"></el-page-header>
    <el-divider></el-divider>
    <div class="img-container">
      <img class="img" :src="project.img" alt />
    </div>
    <p class="item">
      项目ID：
      <span class="item-detail">{{project._id}}</span>
    </p>
    <p class="item">
      项目名称：
      <span class="item-detail">{{project.projectName}}</span>
    </p>
    <p class="item">
      所在省份：
      <span class="item-detail">{{project.province}}</span>
    </p>
    <p class="item">
      所在县市：
      <span class="item-detail">{{project.city}}</span>
    </p>
    <p class="item">
      详细地址：
      <span class="item-detail">{{project.address}}</span>
    </p>
    <p class="item">
      创建时间：
      <span class="item-detail">{{time}}</span>
    </p>
    <p class="item">
      查看人数：
      <span class="item-detail">{{watchs}}</span>
    </p>
    <p class="item">
      所有者：
      <span class="link" @click="checkUser(project.ownerId)">详情</span>
    </p>
    <p class="item">
      开放状态：
      <span class="item-detail">{{status}}</span>
    </p>

    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="30%">
      <div style="text-align:center">
        <img :src="user.img" class="avatar" alt />
        <p>用户名：{{user.userName||"未完善"}}</p>
        <p>邮 箱：{{user.email||"未完善"}}</p>
        <p>号 码：{{user.phone}}</p>
        <p>地 址：{{user.address||"未完善"}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {},
      user: {},
      dialogVisible: false
    };
  },
  computed: {
    time: function() {
      if (this.project.createdTime == null) {
        return "";
      } else {
        return this.project.createdTime.slice(0, 10);
      }
    },
    watchs: function() {
      if (this.project.watchersId == null) {
        return 0;
      } else {
        return this.project.watchersId.length || 0;
      }
    },
    status: function() {
      if (this.project.openStatus === true) {
        return "已开放";
      } else {
        return "未开放";
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push("/projects");
    },
    checkUser(id) {
      window.console.log(this.project.ownerId);
      this.$http.get(`/user/${id}`).then(res => {
        this.dialogVisible = true;
        this.user = res.data;
      });
    }
  },
  created() {
    this.$http.get(`/project/${this.$route.params.id}`).then(res => {
      this.project = res.data;
    });
  }
};
</script>

<style scoped>
.img-container {
  text-align: center;
}
.img {
  border-radius: 5px;
  display: block;
  width: 600px;
  margin: 0 auto;
}
.item {
  font-weight: 200;
}
.item-detail {
  font-weight: 400;
}
.link {
  color: #409eff;
}
.link:hover {
  cursor: pointer;
}
.avatar {
  height: 30px;
  width: 30px;
}
</style>