
/*localstrrage信息api*/

/*store库对浏览器做了兼容，以及做了JSON字符串的转换*/
import store from 'store'
/*
* user信息*/
const USER_KEY = 'user_key'
const getUserInfo = ()=>{
    return store.get(USER_KEY)
}
const setUserInfo = (user)=>{
    store.set(USER_KEY,user)
}
const removeUserInfo = ()=>{
    store.remove(USER_KEY)
}


export {
    getUserInfo,
    setUserInfo,
    removeUserInfo
}