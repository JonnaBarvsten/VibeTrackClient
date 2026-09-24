import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

export async function login(email, password) {
    const response = await api.post("/Auth/login", {email, password});
    return response.data;
}

export async function register(userData) {
    const response = await api.post("/Auth/register", userData);
    return response.data;
}

export async function logout() {
    const response = await api.post("/Auth/logout");
    return response.data;
}

export async function checkAuthentication() {
    try {
        const response = await api.get("/Auth/me");
        return response.data;

    } catch (error) {
        if (error.response?.status === 401) {
            return null;
        }

        console.log("Fel vid hämtning av användare:", error);
        return null;
    }
}