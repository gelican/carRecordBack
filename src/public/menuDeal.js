/**
 * 处理菜单，返回组合后的嵌套对象
 * 1后端返回的菜单列表需按parentId升序
 * 2第一次遍历原始menuList，生成对象形式内容作为returnObj项，并每个子级继承拓展parentIds数组
 * 3第二次遍历returnObj和项的parentIds，生成父子级嵌套的对象形式的菜单对象，保留下returnObj['0']就是需要的菜单对象
 * 4递归的方式把对象形式转换为对象数组的菜单
 * return 处理后的菜单对象
 * @menuList 接口返回的菜单列表
 * @addRoutes 是否添加动态路由
 */
export default (menuList = [], addRoutes = false) => {
    let returnObj = {
        '0': {
            id: 0,
            childObj: {},
        },
    }
    // 遍历组合成嵌套的对象
    menuList.rows.forEach(row => {
        let parentIds = []
        if (row.parentId !== 0 && returnObj[row.parentId]) {
            parentIds.push(...returnObj[row.parentId].parentIds, row.parentId)
        } else {
            parentIds.push(row.parentId)
        }
        returnObj[row.id] = {
            id: row.id,
            parentId: row.parentId,
            parentIds,
            title: row.title,
            sort: row.sort,
            path: row.path,
            root: row.root,
            parent: row.Parent,
            childObj: {},
        }
    });
    for (let key in returnObj) {
        if (key === '0') continue
        let row = returnObj[key]
        let parent = undefined
        row.parentIds.forEach(pid => {
            pid = pid.toString()
            if (!parent) {
                parent = returnObj[pid]
            } else {
                parent = parent.childObj[pid]
            }
        })
        parent.childObj[row.id] = JSON.parse(JSON.stringify(row))
    }
    returnObj = returnObj['0'].childObj
    let array = recurs(returnObj)
    return array
};

function recurs(obj) {
    let _list = []
    for (let key in obj) {
        Object.keys(obj[key].childObj).length === 0 ?
            obj[key].children = [] :
            obj[key].children = recurs(obj[key].childObj)
        let child = {
            id: obj[key].id,
            parentId: obj[key].parentId,
            parentIds: obj[key].parentIds,
            parent: obj[key].parent,
            title: obj[key].title,
            sort: obj[key].sort,
            path: obj[key].path || '',
            root: obj[key].root,
            // children: obj[key].children,
            // component: () => import(`@/view/${obj[key].path}/index.vue`),
        }
        if (obj[key].children.length > 0) child.children = obj[key].children
        _list.push(child)
    }
    _list.sort((a, b) => {
        return a.sort - b.sort
    })
    return _list
}