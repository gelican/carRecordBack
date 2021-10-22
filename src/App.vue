<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import routeExist from "@/public/routeExist";
import menuAddRoute from "./public/menuAddRoute";
export default {
  name: "App",
  watch: {
    $route(to, from) {
      console.log(to, from);
      if (!routeExist(to.path)) {
        this.$router.replace({
          path: "/404",
        });
      }
    },
  },
  created() {
    window.vm = this
    this.$store.commit("getStorageUserData");
    let menuList = window.localStorage.getItem("menuList")
    if (!menuList) return
    menuList = JSON.parse(menuList)
    menuAddRoute(menuList)
    if (!routeExist(this.$route.path)) {
      this.$router.replace({
        path: "/404",
      });
    }
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>
