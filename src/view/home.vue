<template>
    <div>
        <Header></Header>
    </div>
</template>

<script>
    import Header from '../components/header/index.vue'
    export default {
        name: "home",
        components:{
            Header
        },
        data() {
            return {
            }
        },
        async created() {
            await this.getMenuList()
        },
        methods: {
            async getMenuList() {
                let res = await this.$api.getMenuList()
                console.log(res)
            }
        },
    }
</script>

<style scoped>

</style>