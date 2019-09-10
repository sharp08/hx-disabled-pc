<template>
  <div class="login-page-container">
    <div class="mid-container">
      <div class="content-container">
        <div class="logo-container">
          <img alt class="logo" src="../assets/images/logo.png" srcset />
        </div>
        <div class="title-container">
          <h3 class="title">环县残疾人联合会</h3>
          <h3 class="sub-title">Huanxian Disabled Person's Federation</h3>
        </div>
        <div class="login-container">
          <Form :model="model">
            <FormItem prop="loginName">
              <Input placeholder="请输入用户名" v-model="model.loginName">
                <Icon slot="prefix" type="ios-contact" />
              </Input>
            </FormItem>
            <FormItem>
              <Input placeholder="请输入密码" type="password" v-model="model.password">
                <Icon slot="prefix" type="ios-lock-outline" />
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="login" long type="warning">登录</Button>
            </FormItem>
            <div class="forgot-container">
              <!-- <span>忘记密码?</span> -->
            </div>
          </Form>
        </div>
      </div>
      <div class="tips">
        <span>Copyright@2018 成都富君科技</span>
      </div>
    </div>
  </div>
</template>

<script>
import { $$login } from "@js/apis.js"
import { mapMutations } from "vuex"
export default {
  name: "Login",
  data() {
    return {
      model: {
        loginName: "",
        password: ""
      }
    }
  },
  mounted() {},
  methods: {
    ...mapMutations(["setUserInfo"]),
    login() {
      $$login(this.model).then(({ data }) => {
        $K.setSession("userInfo", data)
        this.setUserInfo(data)
        this.$router.push({ name: "BaseInfo" })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login-page-container {
  height: 100%;
  width: 100%;
  background: #008cee;
  display: flex;
  justify-content: center;
  .mid-container {
    padding-top: 10vh;
    .logo-container {
      text-align: center;
    }
    .title-container {
      text-align: center;
      color: #fff;
      margin-bottom: 20px;
      .title {
        font-size: 26px;
      }
      .sub-title {
        font-size: 16px;
        opacity: 0.9;
      }
    }
    .login-container {
      padding: 20px;
      border-radius: 5px;
      width: 300px;
      background: rgba(255, 255, 255, 0.8);
      .forgot-container {
        text-align: right;
        font-size: 12px;
        color: #5cadff;
      }
    }
    .tips {
      color: #fff;
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
    }
  }
}
</style>
