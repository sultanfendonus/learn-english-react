import axios from 'axios';

//export const baseUrl = 'https://english-api.factandfun.com'
export const baseUrl = 'http://127.0.0.1:3002'
const MainApi = axios.create({
    baseURL : baseUrl,
    headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
    }
})

const UNAUTHORIZED = 401;
MainApi.interceptors.response.use(
    response => response,
    error => {
        const {status} = error.response;
        if (status === UNAUTHORIZED) {
            window.localStorage.removeItem('token')
            window.location.href = "/"
        }
        return Promise.reject(error);
    }
);

export default MainApi
