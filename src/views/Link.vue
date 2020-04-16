<template>
  <div>
    <el-card class="box-card">
      <el-form
        :model="link"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="链接内容" prop="title">
          <el-input v-model="link.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="url">
          <el-input v-model="link.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-table
        :data="links"
        stripe
        style="width: 100%"
        :row-style="{height:0+'px'}"
        :cell-style="{padding:4+'px'}"
      >
        <el-table-column prop="title" label="内容"></el-table-column>
        <el-table-column prop="createTime" label="发布时间"></el-table-column>
        <el-table-column prop="url" label="地址"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="editLink(scope.row._id)" type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteLink(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="修改链接" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="链接内容" label-width="100px">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" label-width="100px">
          <el-input v-model="form.url" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;updateLink(form._id)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: {
        title: "",
        url: ""
      },
      links: [],
      dialogFormVisible: false,
      form: {},
      rules: {
        title: [
          { required: true, message: "请输入链接内容", trigger: "blur" },
          {
            min: 3,
            max: 100,
            message: "长度在 3 到 100 个字符",
            trigger: "change"
          }
        ],
        url: [
          { required: true, message: "请输入链接地址", trigger: "blur" },
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
          this.link.createTime = new Date();
          this.$http.post("/link/create", this.link).then(res => {
            this.links = res.data;
            this.$message.success(`成功添加链接`);
            this.link = {};
          });
        } else {
          return false;
        }
      });
    },
    deleteLink(id) {
      this.$confirm("此操作将永久删除该链接, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/link/delete/${id}`).then(res => {
            this.links = res.data;
            this.$message.success("删除成功");
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    editLink(id) {
      this.$http.get(`/link/${id}`).then(res => {
        this.form = res.data;
        this.dialogFormVisible = true;
      });
    },
    updateLink(id) {
      window.console.log(this.form);
      this.$http.post(`/link/update/${id}`, this.form).then(res => {
        this.links = res.data;
      });
    }
  },
  created() {
    this.$http.get("/link/list").then(res => {
      this.links = res.data;
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
.box-card {
  margin-bottom: 20px;
  padding-bottom: 20px;
}
</style>