import axios from 'axios';

export default axios.create({
    baseURL : 'https://english-api.factandfun.com',
    headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
    }
})
