<template>
  <div>
    <el-form
      @submit.native.prevent="saveArticle"
      :rules="rules"
      ref="postForm"
      :model="post"
      label-width="5em"
      class="demo-ruleForm"
      label-position="left"
    >
      <el-row>
        <el-col :sm="16" :md="16" :lg="9" :xl="11">
          <el-form-item label="标题" prop="title">
            <el-input v-model="post.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="16" :md="16" :lg="9" :xl="11">
          <el-form-item label="摘要" prop="digest">
            <el-input v-model="post.digest"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="22" :md="22" :lg="22" :xl="22">
          <el-form-item label="内容" prop="content">
            <vue-editor v-model="post.content" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" native-type="submit">发布</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>>

<script>
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      post: {
        title: "通告名",
        digest: "介绍了通告的主要内容。",
        content:
          "内容内容内容内容。内容内容内容内容。内容内容内容内容。内容内容内容内容。内容内容内容内容。内容内容内容内容。内容内容内容内容。内容内容内容内容。内容内容内容内容。"
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "change" },
          {
            min: 3,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "change"
          }
        ],
        digest: [
          { required: true, message: "请输入摘要", trigger: "change" },
          {
            min: 3,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "change"
          }
        ],
        content: [
          { required: true, message: "请输入内容", trigger: "change" },
          {
            min: 10,
            max: 10000,
            message: "长度在 3 到 10000 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  components: {
    VueEditor
  },
  methods: {
    saveArticle() {
      this.$refs["postForm"].validate(valid => {
        if (valid) {
          this.post.createTime = new Date();
          window.console.log(this.post);
          this.$http.post("/post/create", this.post).then(() => {
            this.$message.success("文章添加成功!");
            this.$router.push("/postlist");
          });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$message.info("已取消新建文章");
      this.$router.push("/postlist");
    }
  },
  created() {}
};
</script>