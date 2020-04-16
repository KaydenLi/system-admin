<template>
  <div>
    <el-card class="box-card" shadow="never" style="height:100vh;margin:0;padding:0;border:none">
      <div slot="header" class="clearfix">
        <span>
          <i class="el-icon-menu"></i>&nbsp;&nbsp;注册账号
        </span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="getLoginPage">去登陆</el-button>
      </div>
      <div>
        <el-row>
          <el-col
            class="border"
            :xs="{span: 24, offset: 0}"
            :sm="{span: 18, offset: 3}"
            :md="{span: 14, offset: 5}"
            :lg="{span: 10, offset: 7}"
            :xl="{span: 8, offset: 8}"
          >
            <el-form
              :model="model"
              :rules="rules"
              ref="rules"
              status-icon
              label-width="100px"
              class="demo-ruleForm"
              label-position="left"
            >
              <el-form-item label="昵称" prop="userName">
                <el-input v-model="model.userName" clearable></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="model.password" clearable type="password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="acknowledgement">
                <el-input v-model="model.acknowledgement" clearable type="password"></el-input>
              </el-form-item>
              <el-form-item label="电话号码" prop="phone">
                <el-input v-model="model.phone" clearable></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="verificationCode">
                <el-input v-model="model.verificationCode" clearable>
                  <el-button slot="append" @click="getVerificationCode">发送验证码</el-button>
                </el-input>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="(createUser('rules'))">立即创建</el-button>
                <el-button @click="cancelCreate">取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.border {
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 30px;
}
</style>>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.model.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      model: {
        userName: "kaydenli",
        password: "123456789",
        acknowledgement: "123456789",
        phone: "15752084956",
        verificationCode: "1234",
        createdTime: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 50, message: "长度在 6 到 50 个字符", trigger: "blur" }
        ],
        acknowledgement: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "change" }
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "长度为4个字符", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    getLoginPage() {
      this.$router.push("/login");
    },
    getVerificationCode() {
      alert("获取验证码");
    },
    createUser(rules) {
      this.$refs[rules].validate(valid => {
        if (valid) {
          this.model.createdTime = new Date();
          this.$http.post("/admin/create", this.model).then(res => {
            window.console.log(this.model);
            this.$message.success(`用户${res.data}注册成功`);
            this.$router.push("/login");
          });
        } else {
          return false;
        }
      });
    },
    cancelCreate() {
      this.$message({
        message: "已取消创建用户!",
        type: "info",
        center: true
      });
      this.$router.push("/login");
      return;
    }
  }
};
</script>