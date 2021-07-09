// json格式的内容转化为FormData格式
let outPut = json => {
    let formData = new FormData()
    for (let key in json) {
        formData.append(key, json[key])
    }
    return formData
}
export default outPut