import {api } from './AuthService'

export async function getMoodLogs(){
    const response = await api.get('/MoodLog');
    return response.data;
}

export async function createMoodLog(moodLogsDto) {
    const response = await api.post('/MoodLog', moodLogsDto)
    return response.data;
}

export async function updateMoodLog(id, moodLogsDto){
    const response = await api.put(`/MoodLog/${id}`, moodLogsDto)
    return response.data;
}