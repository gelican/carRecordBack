<template>
  <div>
    <el-aside width="200px">
      <el-menu
        :default-active="active"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened="true"
        @select="menuSelect"
      >
        <menuItem :list="list"></menuItem>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import menuItem from '@/components/aside/menuItem';

export default {
  name: "aside",
  components: {
    menuItem
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      active: '',
      menuList: [],
    };
  },
  watch: {
    $route(to) {
      this.active = to.path.substr(1)
    },
  },
  created() {
    this.active = this.$route.path.substr(1)
  },
  methods: {
    // 切换菜单时
    menuSelect(index, indexPath) {
      this.$router.push({
        path: '/' + index
      }).catch(err => {
        // 没有对应文件的路由
        console.log(err)
        this.$router.push({
          path: '/404'
        })
      })
    },
    setActive() {}
  },
};
</script>

<style scoped lang="scss">
.el-aside {
  background-color: #304156;
  height: 100vh;
}
</style>
