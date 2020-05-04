import axios from 'axios';
export const baseUrl = 'https://english-api.factandfun.com'
//export const baseUrl = 'http://127.0.0.1:3002'
export default axios.create({
    baseURL : baseUrl,
    headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
    }
})
