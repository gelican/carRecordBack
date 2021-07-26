<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import routeExist from "@/public/routeExist";
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
    this.$store.commit("getStorageUserData");
    let menuList = JSON.parse(window.localStorage.getItem("menuList"));
    this.recurs(menuList);
    this.$router.addRoutes([
      {
        path: "/",
        component: () => import("@/view/home.vue"),
        children: menuList,
      },
    ]);
    if (!routeExist(this.$route.path)) {
      this.$router.replace({
        path: "/404",
      });
    }
  },
  methods: {
    recurs(list) {
      for (let row of list) {
        if (row.children) this.recurs(row.children);
        row.component = () => import(`@/view/${row.path}/index.vue`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>
