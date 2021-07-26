<template>
  <div>
    <template v-for="row in list">
      <el-submenu
        v-if="row.children && row.children.length > 0"
        :key="row.id"
        :index="row.path"
      >
        <template slot="title">
          <i v-if="row.icon !== ''" :class="row.icon"></i>
          <span>{{ row.title }}</span>
        </template>
        <menuItem :list="row.children"></menuItem>
      </el-submenu>
      <el-menu-item v-else :key="row.id" :index="row.path">{{
        row.title
      }}</el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "menuItem",
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
