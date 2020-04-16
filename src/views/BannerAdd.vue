<template>
  <div>
    <el-row>
      <el-col
        class="border"
        :xs="{span: 24, offset: 0}"
        :sm="{span: 18, offset: 0}"
        :md="{span: 18, offset: 0}"
        :lg="{span: 16, offset: 0}"
        :xl="{span: 16, offset: 0}"
      >
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: {
        title: "",
        img: "",
        bgcolor: "background-color:#000"
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
          this.banner.createTime = new Date();
          this.$http.post("/banner/create", this.banner).then(res => {
            this.$message.success(`成功添加${res.data.title}`);
            this.banner.img = "";
            this.banner.title = "";
          });
        } else {
          return false;
        }
      });
    },
    afterUpload(res) {
      this.$set(this.banner, "img", res.url);
    }
  },
  created() {}
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