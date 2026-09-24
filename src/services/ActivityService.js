import {api} from './AuthService'

export async function getActivities() {
    const response = await api.get('/Activity');
    return response.data;
}

export async function getActivityById(id){
    const response = await api.get(`/Activity/${id}`);
    return response.data;
}

export async function createActivity(activityDto){
    const response = await api.post('/Activity', activityDto);
    return response.data;
}

export async function deleteActivity(id){
    const response = await api.delete(`/Activity/${id}`);
    return response.data;
}