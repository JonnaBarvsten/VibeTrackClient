import { Card, CardContent, Typography, Paper, Box } from '@mui/material'

export default function StatCard({logs = []}) {

    const totalLogs = logs.length;

    const totalSleep = logs.reduce((sum, log) => sum + Number(log.dailyStats?.hoursOfSleep || 0), 0);
    const totalEnergy = logs.reduce((sum, log) => sum + Number(log.dailyStats?.moodLogs?.[0]?.energyLevel || 0), 0);
    const totalStress = logs.reduce((sum, log) => sum + Number(log.dailyStats?.moodLogs?.[0]?.stressLevel || 0), 0);

    const avgSleep = totalLogs > 0 ? (totalSleep / totalLogs).toFixed(1) : "-";
    const avgEnergy = totalLogs > 0 ? (totalEnergy / totalLogs).toFixed(1) : "-";
    const avgStress = totalLogs > 0 ? (totalStress / totalLogs).toFixed(1) : "-";

    return (
        <Paper className="stats-container">

            <Box>
                <Typography>
                    {totalLogs > 0 ? "Genomsnittlig översikt" : "Ingen Data loggad ännu"}
                </Typography>
            </Box>

            <Card className="stat-card"
                 sx= {{
                    borderRadius: 3
                }} 
            >
                <CardContent >
                    <Typography>Energi</Typography>
                    <Typography>
                        {totalLogs? avgEnergy : "-"}
                    </Typography>
                </CardContent>
            </Card>

            <Card className="stat-card"
                 sx= {{
                    borderRadius: 3
                }} 
            >
                <CardContent>
                    <Typography>Stress</Typography>
                    <Typography>
                        {totalLogs? avgStress : "-"}
                    </Typography>
                </CardContent>
            </Card>

            <Card className="stat-card"
                 sx= {{
                    borderRadius: 3
                }} 
            >
                <CardContent>
                    <Typography>Sömn</Typography>
                    <Typography>
                        {totalLogs? avgSleep : "-"}
                    </Typography>
                </CardContent>
            </Card>
        </Paper>
    )
}