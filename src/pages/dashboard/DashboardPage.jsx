import { Box, Grid } from '@mui/material';
import StatCard from '../../components/statCard/StatCard';
import MoodChart from '../../components/moodChart/MoodChart';
import ActivityCard from '../../components/activityCard/ActivityCard';
import SummaryStatCard from '../../components/summaryStatCard/SummaryStatCard';
import LogList from '../../components/logList/LogList';
import Header from '../../components/header/Header';
import { useState, useEffect } from 'react';
import { deleteDailyLog, getDailyLog } from '../../services/DailyLogService';
import { checkAuthentication } from '../../services/AuthService';

export default function DashboardPage() {

    const [logs, setLogs] = useState([]);
    const [user, setUser] = useState(null);

    async function loadData() {
        try {
            const data = await getDailyLog();
            setLogs(data);
        }
        catch (error) {
            console.log("Kunde inte hämta loggar: ", error);
        }
    }

    async function loadUser() {
        try {
            const data = await checkAuthentication();
            setUser(data);
        }
        catch (error) {
            console.log("Kunde inte hämta användare:", error);
        }
    }

    useEffect(() => {
        loadData();
        loadUser();
    }, []);

    async function handleDeleteLog(id) {
        try {
            await deleteDailyLog(id);
            loadData();
        }
        catch (error) {
            console.log("Kunde inte radera logg: ", error);
        }
    }

    const todayLog = logs.find(log => new Date(log.date).toDateString() === new Date().toDateString());

    return (
        <>
            <Header username={user?.username} />

            <Box
                sx={{
                    backgroundColor: '#DCD6E8',
                    minHeight: '100vh',
                    padding: 3
                }}
            >
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatCard
                        logs={logs}
                        onRefresh={loadData}
                    />
                </Grid>

                <Grid container spacing={3} alignItems="stretch">

                    <Grid size={{ xs: 12, md: 8 }}>
                        <MoodChart logs={logs} />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <ActivityCard
                            todayLog={todayLog}
                        />
                    </Grid>

                </Grid>

                <LogList
                    logs={logs}
                    onDeleteLog={handleDeleteLog}
                />

                <SummaryStatCard logs={logs} />

            </Box>
        </>
    );
}