import axios from "axios";

const axiosRequest = axios.create({
    baseURL: "https://travelify-backend.onrender.com",
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosRequest;