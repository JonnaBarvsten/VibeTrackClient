import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})

console.log(import.meta.env.VITE_API_BASE_URL);

export async function login(email, password) {
    const response = await api.post("/Auth/login?useCookies=true", {email, password});
    return response.data;
}

export async function register(userData) {
    const response = await api.post("/Auth/register", userData);
    return response.data;
}

export async function logout() {
    const response = await api.post("/Auth/logout");
    return response.data
}

export async function  checkAuthentication() {
    try{
        await api.get("/Auth/me")
        return true;
    } catch(error){
        if(error.response?.status == 401){
            return false;
        }
    }
}