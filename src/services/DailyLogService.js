import {api} from './AuthService'

export async function getDailyLog(){
    const response = await api.get('/DailyLogs')
    return response.data;
}

export async function deleteDailyLog(id) {
    const response = await api.delete(`/DailyLogs/${id}`);
    return response.data;
}