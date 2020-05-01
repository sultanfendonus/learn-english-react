import axios from 'axios';

export default axios.create({
    baseURL : 'http://192.168.31.96:8080',
    headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
    }
})
