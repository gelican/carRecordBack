/**
 * 动态加载路由
 * @menuList 整合后的菜单列表
 */
let components = []
export default (menuList) => {
    components = []
    recurs(menuList);
    window.vm.$router.addRoutes([
        {
            path: "/",
            component: () => import("@/view/home.vue"),
            children: components,
        },
    ]);
    console.log('menuAddRoute.js:', components)
}
// 遍历待添加的路由列表 组件文件加载
function recurs(list) {
    for (let row of list) {
        if (row.children){
            recurs(row.children)
        } else {
            components.push({
                path: `/${row.path}`,
                component: () => import(`@/view/${row.path}`)
            })
        }
    }
}
