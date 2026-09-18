import { Box, Grid } from '@mui/material';
import StatCard from '../../components/statCard/StatCard';
import MoodChart from '../../components/moodChart/MoodChart';
import ActivityCard from '../../components/activityCard/ActivityCard'
import LogoutButton from '../../components/logoutButton/LogoutButton'

export default function DashboardPage() {
    return (
    <Box
        sx={{
            backgroundColor: '#DCD6E8',
            minHeight: '100vh',
            padding: 3
        }}
    >
         <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard />
            <LogoutButton/>
        </Grid>

        <Grid container spacing={3} alignItems="stretch" >
            <Grid size={{xs: 12, md: 8}}>
            <MoodChart/>
            </Grid>

            <Grid size={{xs: 12, md: 4}}>
            <ActivityCard/>
            </Grid>

        </Grid>
    </Box>
    )  
}