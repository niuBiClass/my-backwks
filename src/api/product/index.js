import service from "../request";

/*获取商品列表*/
const getProductList = (params) => service({
    method: 'get',
    url: '/manage/product/search',
    params
})
/*跟新上架下架状态*/

const updateStatus = (data) => service({
    method: 'post',
    url: '/manage/product/updateStatus',
    data
})

/*通过分类id获取分类名称*/

const getCategoryInfo = (params) => service({
    method: 'GET',
    url: '/manage/category/info',
    params
})

/*上传图片*/

const upload = (params) => service({
    method: 'POST',
    url: '/manage/img/upload',
    params
})
export {
    getProductList,
    updateStatus,
    getCategoryInfo,
    upload
}