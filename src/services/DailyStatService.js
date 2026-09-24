import {api} from './AuthService'

export async function getDailyStatById(id){
    const response = await api.get(`/DailyStats/${id}`);
    return response.data;
}

export async function createDailyStat(dailyStatDto){
    const response = await api.post('/DailyStats', dailyStatDto);
    return response.data;
}

export async function updateDailyStat(id, dailyStatDto) {
    const response = await api.put(`/DailyStats/${id}`, dailyStatDto);
    return response.data;
}

export async function deleteDailyStat(id){
    const response = await api.delete(`/DailyStats/${id}`);
    return response.data;
}

export async function getMoods() {
    const response = await api.get('/MoodLog/moods');
    return response.data;
}