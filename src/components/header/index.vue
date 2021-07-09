<template>
    <div>
        1
    </div>
</template>

<script>
    export default {
        name: "home",
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