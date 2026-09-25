import './StatCard.css';
import {
    Card,
    CardContent,
    Typography,
    Paper,
    Box,
    Button
} from '@mui/material';
import { useState } from 'react';
import StatModal from '../statModal/StatModal';

export default function StatCard({ logs = [], onRefresh }) {

    const [openModal, setOpenModal] = useState(false);

    const todayLog = logs.find(log => new Date(log.date).toDateString() === new Date().toDateString());

    const mood = todayLog?.dailyStats?.moodLogs?.[0]?.moodName ?? "-";
    const energy = todayLog?.dailyStats?.moodLogs?.[0]?.energyLevel ?? "-";
    const stress = todayLog?.dailyStats?.moodLogs?.[0]?.stressLevel ?? "-";
    const sleep = todayLog?.dailyStats?.hoursOfSleep ?? "-";

    const handleOpenModal = (e) => {
        e.currentTarget.blur();
        setOpenModal(true);
    };

    return (
        <>
            <Paper
                className="stats-container"
                sx={{ borderRadius: 3 }}
            >
                <Box className="stats-header">
                    <Typography
                        variant="h6"
                        className="stats-title"
                    >
                        {todayLog ? "Dagens översikt" : "Hur mår du idag?"}
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={handleOpenModal}
                        sx={{
                            backgroundColor: '#6f5f8f',
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: '#594b75'
                            }
                        }}
                    >
                        {todayLog ? "Redigera dag" : "Logga din dag"}
                    </Button>

                </Box>

                <Box className="stats-cards">

                    <Card
                        sx={{
                            borderRadius: 3,
                            backgroundColor: '#F4F1F8'
                        }}
                    >
                        <CardContent className="stat-card-content">
                            <Typography className="stat-label">
                                Humör
                            </Typography>

                            <Typography
                                variant="h5"
                                className="stat-value"
                            >
                                {mood}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        sx={{
                            borderRadius: 3,
                            backgroundColor: '#F4F1F8'
                        }}
                    >
                        <CardContent className="stat-card-content">
                            <Typography className="stat-label">
                                Energi
                            </Typography>

                            <Typography
                                variant="h5"
                                className="stat-value"
                            >
                                {energy}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        sx={{
                            borderRadius: 3,
                            backgroundColor: '#F4F1F8'
                        }}
                    >
                        <CardContent className="stat-card-content">
                            <Typography className="stat-label">
                                Stress
                            </Typography>

                            <Typography
                                variant="h5"
                                className="stat-value"
                            >
                                {stress}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card
                        sx={{
                            borderRadius: 3,
                            backgroundColor: '#F4F1F8'
                        }}
                    >
                        <CardContent className="stat-card-content">
                            <Typography className="stat-label">
                                Sömn
                            </Typography>

                            <Typography
                                variant="h5"
                                className="stat-value"
                            >
                                {sleep} {sleep !== "-" && "h"}
                            </Typography>
                        </CardContent>
                    </Card>

                </Box>
            </Paper>
            
            <StatModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                todayLog={todayLog}
                onSave={onRefresh}
            />
        </>
    );
}