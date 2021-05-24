import service from "../request";


const login = (data) => service({
    method: 'post',
    url: '/login',
    data
})

export {
    login
}