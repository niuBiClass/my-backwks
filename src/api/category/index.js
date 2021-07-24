import service from "../request";

/*获取分类列表*/
const getCategoryList = (params) => service({
    method: 'GET',
    url: '/manage/category/list',
    params
})
/*添加分类*/
const addCategory = (data) => service({
    method: 'post',
    url: '/manage/category/add',
    data
})
/*更新分类*/
const updateCategory = (data) => service({
    method: 'post',
    url: '/manage/category/update',
    data
})
export {
    updateCategory,
    addCategory,
    getCategoryList
}