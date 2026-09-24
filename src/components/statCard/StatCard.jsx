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

    const latestMoodLog = todayLog?.dailyStats?.moodLogs?.[0];

    const mood = latestMoodLog?.mood ?? "-";
    const energy = latestMoodLog?.energyLevel ?? "-";
    const stress = latestMoodLog?.stressLevel ?? "-";
    const sleep = todayLog?.dailyStats?.hoursOfSleep ?? "-";

    return (
        <Paper className="stats-container">

            <Box>
                <Typography>
                    {todayLog ? "Dagens översikt" : "Hur mår du idag?"}
                </Typography>

                <Button onClick={() => setOpenModal(true)}>
                    {todayLog ? "Redigera dag" : "Logga din dag"}
                </Button>
            </Box>

            <Card
                className="stat-card"
                sx={{
                    borderRadius: 3
                }}
            >
                <CardContent>
                    <Typography>
                        Humör
                    </Typography>

                    <Typography>
                        {todayLog ? mood : "-"}
                    </Typography>
                </CardContent>
            </Card>

            <Card
                className="stat-card"
                sx={{
                    borderRadius: 3
                }}
            >
                <CardContent>
                    <Typography>
                        Energi
                    </Typography>

                    <Typography>
                        {todayLog ? energy : "-"}
                    </Typography>
                </CardContent>
            </Card>

            <Card
                className="stat-card"
                sx={{
                    borderRadius: 3
                }}
            >
                <CardContent>
                    <Typography>
                        Stress
                    </Typography>

                    <Typography>
                        {todayLog ? stress : "-"}
                    </Typography>
                </CardContent>
            </Card>

            <Card
                className="stat-card"
                sx={{
                    borderRadius: 3
                }}
            >
                <CardContent>
                    <Typography>
                        Sömn
                    </Typography>

                    <Typography>
                        {todayLog ? sleep : "-"}
                    </Typography>
                </CardContent>
            </Card>

            <StatModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                todayLog={todayLog}
                onSave={onRefresh}
            />

        </Paper>
    );
}