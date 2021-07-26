export default (path) => {
    let paths = [
        '/',
        '/404',
        '/login',
        '/menu',
        '/role',
        '/user',
    ];
    return paths.indexOf(path) >= 0
}