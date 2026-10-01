import {api} from './AuthService'

export async function getUsers() {
    const response = await api.get('/Admin/users');
    return response.data;
}

export async function deleteUser(id) {
    const response = await api.delete(`/Admin/users/${id}`);
    return response.data;
}