<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑轮播图</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="colseEdit">关闭</el-button>
      </div>
      <el-form
        :model="banner"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="轮播内容" prop="title">
          <el-input v-model="banner.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="轮播图片">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL+'/upload/img'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <img v-if="banner.img" :src="banner.img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="轮播背景">
          <el-input v-model="banner.bgcolor" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: {
        title: "",
        img: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入轮播图内容", trigger: "blur" },
          {
            min: 3,
            max: 100,
            message: "长度在 3 到 100 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.banner.img === "") {
            this.$message.danger("请先选择轮播图");
            return false;
          }
          this.$http
            .post(`/banner/update/${this.$route.params.id}`, this.banner)
            .then(res => {
              this.$message.success(`成功修改${res.data.title}`);
              this.$router.push("/bannerlist");
            });
        } else {
          return false;
        }
      });
    },
    afterUpload(res) {
      this.$set(this.banner, "img", res.url);
    },
    colseEdit(){
      this.$router.push('/bannerlist')
    }
  },
  created() {
    this.$http.get(`/banner/${this.$route.params.id}`).then(res => {
      this.banner = res.data;
    });
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 30px;
  color: #8c939d;
  width: 600px;
  height: 300px;
  line-height: 300px;
  text-align: center;
}
.avatar {
  width: 600px;
  height: 300px;
  display: block;
}
</style>