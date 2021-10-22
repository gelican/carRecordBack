/**
 * 是否存在路由表里
 * @param path
 * @returns {boolean}
 */
let paths = [];
export default (path) => {
    let menuList = window.localStorage.getItem("menuList")
    if (menuList) {
        paths = [
            '/',
            '/404',
            '/login',
        ]
        menuList = JSON.parse(menuList)
        recurs(menuList)
    }
    return paths.indexOf(path) >= 0
}
function recurs(list) {
    for (let row of list) {
        if (row.children) {
            recurs(row.children);
        } else {
            paths.push('/' + row.path)
        }
    }
}
