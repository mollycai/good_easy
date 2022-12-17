// 设置token的方法
export const setToken = token => {
    sessionStorage.setItem('token', token);
}

// 获取token
export const getToken = () => {
    return sessionStorage.getItem('token');
}

// 清除token
export const removeToken = () => {
    sessionStorage.removeItem('token');
}