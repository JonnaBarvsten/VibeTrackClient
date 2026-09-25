import { 
    Card, 
    CardContent, 
    Typography, 
    Paper, 
    Box 
} from '@mui/material'; 
import './SummaryStatCard.css'; 
 
export default function SummaryStatCard({logs = []}) { 
 
    const totalLogs = logs.length; 
    const totalSleep = logs.reduce((sum, log) => sum + Number(log.dailyStats?.hoursOfSleep || 0), 0); 
    const totalEnergy = logs.reduce((sum, log) => sum + Number(log.dailyStats?.moodLogs?.[0]?.energyLevel || 0), 0); 
    const totalStress = logs.reduce((sum, log) => sum + Number(log.dailyStats?.moodLogs?.[0]?.stressLevel || 0), 0); 
 
    const avgSleep = totalLogs > 0 ? (totalSleep / totalLogs).toFixed(1) : "-"; 
    const avgEnergy = totalLogs > 0 ? (totalEnergy / totalLogs).toFixed(1) : "-"; 
    const avgStress = totalLogs > 0 ? (totalStress / totalLogs).toFixed(1) : "-"; 
 
    return ( 
        <Paper 
            className="summary-container" 
            sx={{ borderRadius: 3 }} 
        > 
 
            <Typography 
                variant="h6" 
                className="summary-title" 
            > 
                {totalLogs > 0 ? "Genomsnittlig översikt" : "Ingen Data loggad ännu"} 
            </Typography> 
 
            <Box className="summary-cards"> 
 
                <Card
                    sx={{
                        borderRadius: 3,
                        backgroundColor: '#F4F1F8'
                    }}
                > 
                    <CardContent className="summary-card-content"> 
                        <Typography className="summary-label"> 
                            Energi 
                        </Typography> 
 
                        <Typography 
                            variant="h5" 
                            className="summary-value" 
                        > 
                            {avgEnergy} 
                        </Typography> 
                    </CardContent> 
                </Card> 
 
                <Card
                    sx={{
                        borderRadius: 3,
                        backgroundColor: '#F4F1F8'
                    }}
                > 
                    <CardContent className="summary-card-content"> 
                        <Typography className="summary-label"> 
                            Stress 
                        </Typography> 
 
                        <Typography 
                            variant="h5" 
                            className="summary-value" 
                        > 
                            {avgStress} 
                        </Typography> 
                    </CardContent> 
                </Card> 
 
                <Card
                    sx={{
                        borderRadius: 3,
                        backgroundColor: '#F4F1F8'
                    }}
                > 
                    <CardContent className="summary-card-content"> 
                        <Typography className="summary-label"> 
                            Sömn 
                        </Typography> 
 
                        <Typography 
                            variant="h5" 
                            className="summary-value" 
                        > 
                            {avgSleep} {totalLogs > 0 && "h"} 
                        </Typography> 
                    </CardContent> 
                </Card> 
            </Box> 
        </Paper> 
    ); 
}