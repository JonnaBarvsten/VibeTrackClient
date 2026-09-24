import { Card, CardContent, Typography } from '@mui/material';
import { LineChart } from "@mui/x-charts";
import './MoodChart.css';
import { useMemo } from 'react';

export default function MoodChart({ logs = [] }) {

    const sortedLogs = useMemo(() => [...logs].reverse(), [logs]);

    const chartData = useMemo(() => {
        const days = sortedLogs.map(log => log.date);
        const mood = sortedLogs.map(log => log.dailyStats?.moodLogs?.[0]?.mood || 0);
        const energy = sortedLogs.map(log => log.dailyStats?.moodLogs?.[0]?.energyLevel || 0);
        const stress = sortedLogs.map(log => log.dailyStats?.moodLogs?.[0]?.stressLevel || 0);
        const hoursSlept = sortedLogs.map(log => log.dailyStats?.hoursOfSleep || 0);

        return {
            days,
            mood,
            energy,
            stress,
            hoursSlept
        };
    }, [sortedLogs]);

    const xAxis = useMemo(() => [
        {
            scaleType: 'point',
            data: chartData.days
        }
    ], [chartData.days]);

    const series = useMemo(() => [
        { data: chartData.mood, label: 'Humör' },
        { data: chartData.energy, label: 'Energi' },
        { data: chartData.stress, label: 'Stress' },
        { data: chartData.hoursSlept, label: 'Sömn (timmar)' }
    ], [
        chartData.mood,
        chartData.energy,
        chartData.stress,
        chartData.hoursSlept
    ]);

    return (
        <Card
            className="mood-chart-card"
            sx={{ borderRadius: 3 }}
        >
            <CardContent>
                <Typography variant="h6">
                    Humör & Energi
                </Typography>

                <LineChart
                    xAxis={xAxis}
                    series={series}
                    height={300}
                    width={700}
                />
            </CardContent>
        </Card>
    );
}