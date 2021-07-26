<template>
  <div>
    <el-aside width="200px">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
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
      menuList: [],
    };
  },
  async created() {
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.el-aside {
  background-color: #304156;
  height: 100vh;
}
</style>
