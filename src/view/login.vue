<template>
  <div class="wrap">
    <div style="height: 1px;"></div>
    <div class="container">
      <div class="form">
        <div class="title">用户登录</div>
        <div class="input">
          <div class="icon iconfont icon-user"></div>
          <input class="content" v-model="name" @keydown.13="login" placeholder="账号" />
        </div>
        <div class="input">
          <div class="icon iconfont icon-unlock"></div>
          <input
            class="content"
            v-model="password"
            placeholder="密码"
            type="password"
            @keydown.13="login"
          />
        </div>
        <div class="button" v-if="!loading" @click="login">登 录</div>
        <div class="button disabled" v-else>登 录 中...</div>
      </div>
    </div>
  </div>
</template>

<script>
import menuDeal from "@/public/menuDeal";
import menuAddRoute from "../public/menuAddRoute";

export default {
  name: "login",
  data() {
    return {
      loading: false,
      name: "",
      nick: "",
      password: "",
      passwordAgain: "",
    };
  },
  beforeCreate() {
  },
  methods: {
    async login() {
      if (this.name === "") {
        this.$message.error({
          type: "danger",
          message: "请填写账号",
        });
        return;
      }
      if (this.password === "") {
        this.$message.error({
          type: "danger",
          message: "请填写密码",
        });
        return;
      }
      let res = await this.$api.login({
        name: this.name,
        password: this.password,
      });
      if (res) {
        this.$store.commit("updateUserData", {
          user: {
            id: res.id,
            name: res.name,
            nick: res.nick,
            token: res.token,
          },
        });
        await this.getMenuList();
        this.$router.replace({
          path: "/",
        });
      }
    },
    async getMenuList() {
      let res = await this.$api.getMenuList();
      let menuList = menuDeal(res);
      window.localStorage.setItem("menuList", JSON.stringify(menuList));
      menuAddRoute(menuList)
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  height: 100%;
  background-image: url("../assets/images/car.jpg");
  background-size: cover;
  background-position: 12% 0;
  background-repeat: no-repeat;
  position: relative;
  .container {
    width: 400px;
    max-width: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    .form {
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 10px;
      padding-bottom: 10px;
      .title {
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #707070;
        font-size: 18px;
        letter-spacing: 6px;
        padding: 10px 0;
      }
      .input {
        width: 80%;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        margin: 0 auto 20px;
        height: 28px;
        line-height: 28px;
        color: #606266;
        .icon {
          width: 12%;
          height: 100%;
          float: left;
          text-align: center;
        }
        .content {
          outline: none;
          border: none;
          background-color: transparent;
          width: 86%;
          height: 100%;
          padding: 0;
          margin: 0;
          float: right;
        }
      }
      .button {
        width: 80%;
        height: 36px;
        line-height: 36px;
        border-radius: 5px;
        text-align: center;
        margin: 30px auto 10px;
        font-size: 15px;
        color: #fff;
        background-color: #1890ff;
        &:not(.disabled):active {
          background-color: #46a6ff;
        }
        &.disabled {
          background-color: #a2adb6;
        }
      }
      .tips {
        color: #46a6ff;
        height: 20px;
        text-align: center;
        font-size: 14px;
        text-decoration: underline;
      }
    }
  }
}
</style>
