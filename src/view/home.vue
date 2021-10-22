<template>
  <div class="wrap">
    <el-container>
      <Aside :list="menuList"></Aside>
      <el-container>
        <Header></Header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/header/index.vue";
import Aside from "../components/aside/index.vue";

export default {
  name: "home",
  components: {
    Header,
    Aside,
  },
  data() {
    return {
      menuList: [],
    };
  },
  async created() {},
  activated() {
    let menuList = JSON.parse(window.localStorage.getItem("menuList"));
    this.menuList = menuList;
    console.log("Home activated...");
  },
  mounted() {
    console.log('home: mounted...')
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.wrap {
  position: relative;
  height: 100vh;
  background-color: #fff;
}
</style>
