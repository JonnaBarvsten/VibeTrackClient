import { Card, CardContent, Typography } from '@mui/material';

import { LineChart } from "@mui/x-charts";
import './MoodChart.css';
import { useMemo } from 'react';

export default function MoodChart({ logs = [] }) {

    const sortedLogs = useMemo(() => [...logs].reverse(), [logs]);

    const chartData = useMemo(() => {

        const days = sortedLogs.map(log => log.date);
        const mood = sortedLogs.map(log => log.dailyStats?.moodLogs?.[0]?.mood || 0);
        const moodNames = sortedLogs.map(log => log.dailyStats?.moodLogs?.[0]?.moodName || "-");
        const energy = sortedLogs.map(log => log.dailyStats?.moodLogs?.[0]?.energyLevel || 0);
        const stress = sortedLogs.map(log => log.dailyStats?.moodLogs?.[0]?.stressLevel || 0);
        const hoursSlept = sortedLogs.map(log => log.dailyStats?.hoursOfSleep || 0);

        return {
            days,
            mood,
            moodNames,
            energy,
            stress,
            hoursSlept
        };
    }, [sortedLogs]);

    const xAxis = useMemo(() => [
        {
            scaleType: 'point',
            data: chartData.days,

            valueFormatter: (date) => {
                const formattedDate = new Date(date);
                const day = String(formattedDate.getDate()).padStart(2, '0');
                const month = String(formattedDate.getMonth() + 1).padStart(2, '0');

                return `${day}/${month}`;
            },
            tickLabelInterval: (value, index) => index % 5 === 0
        }
    ], [chartData.days]);

    const series = useMemo(() => [
        {
            data: chartData.mood, label: 'Humör',
            valueFormatter: (value, context) => {
                if (context.dataIndex == null) {
                    return value;
                }

                return chartData.moodNames[context.dataIndex];
            }
        },
        { data: chartData.energy, label: 'Energi' },
        { data: chartData.stress, label: 'Stress' },
        { data: chartData.hoursSlept, label: 'Sömn (timmar)' }
    ], [
        chartData.mood,
        chartData.moodNames,
        chartData.energy,
        chartData.stress,
        chartData.hoursSlept
    ]);

    return (
        <Card
            className="mood-chart-card"
            sx={{ borderRadius: 3 }}
        >
            <CardContent className="mood-chart-content">

                <Typography
                    variant="h6"
                    className="mood-chart-title"
                >
                    Humör & Energi
                </Typography>

                <LineChart
                    xAxis={xAxis}
                    series={series}
                    height={320}
                />
            </CardContent>
        </Card>
    );
}