<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.getters.getUserData()
  }
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
</style>
