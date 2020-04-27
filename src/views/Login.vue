<template>
  <div>
    <el-card class="box-card login-card">
      <div slot="header" class="clearfix login-header">
        <span>管理系统</span>
      </div>
      <div class="box-content">
        <el-form status-icon class="demo-ruleForm" @submit.native.prevent="Login">
          <el-form-item>
            <el-input
              id="user"
              v-model="model.phone"
              placeholder="输入手机号"
              autocomplete="off"
              :suffix-icon="userIcon"
              @blur="checkUserName"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              id="password"
              :type="inputType"
              v-model="model.password"
              autocomplete="off"
              placeholder="输入密码"
            >
              <i
                class="el-icon-view el-input__icon"
                type="primary"
                slot="suffix"
                @click="togglePassword"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item class="centerBtn">
            <el-button type="primary" native-type="submit">登录</el-button>
          </el-form-item>
          <el-form-item class="centerBtn">
            <el-button type="text" size="mini" @click="getRegisterPage">注册账号</el-button>
            <el-button type="text" size="mini" @click="getForgetPage">忘记密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.login-card {
  width: 25rem;
  margin: 6rem auto;
}
.box-content {
  margin-top: 20px;
  padding: 0;
}
.login-header {
  text-align: center;
}
.login-header span {
  font-size: 1.5em;
}
.centerBtn {
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      model: {
        phone: "15752084956",
        password: "123456789"
      },
      userIcon: "el-icon-loading",
      passwordIcon: "el-icon-loading",
      inputType: "password"
    };
  },
  methods: {
    checkUserName() {
      if (!/^1[3456789]\d{9}$/.test(this.model.phone)) {
        this.userIcon = "el-icon-circle-close";
      } else {
        this.userIcon = "el-icon-circle-check";
      }
    },
    togglePassword() {
      if (this.inputType === "password") {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    },
    getRegisterPage() {
      this.$router.push("/register");
    },
    getForgetPage() {
      this.$router.push("/forget");
    },
    Login() {
      if (!this.model.phone) {
        this.$message.error("账号不能为空!");
        return;
      }
      if (!this.model.password) {
        this.$message.error("请输入密码!");
        return;
      }
      this.$http.post("/admin/login", this.model).then(res => {
        localStorage.token = res.data.token;
        localStorage.userName = res.data.userInfo.userName;
        this.$message.success(`登录成功!欢迎 ${res.data.userInfo.userName}`);
        this.$router.push("/index");
      });
    }
  },
  created() {
    if (this.model.phone) {
      this.checkUserName();
    }
  }
};
</script>