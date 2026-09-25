import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './ActivityCard.css';
import ActivityModal from '../activityModal/ActivityModal';
import { 
    getActivities,
    deleteActivity 
} from '../../services/ActivityService';

export default function ActivityCard({ todayLog }) {

    const [open, setOpen] = useState(false);
    const [activities, setActivities] = useState([]);

    async function loadActivities() {
        try {
            const data = await getActivities();

            const sortedActivities = [...data].sort((a, b) => b.id - a.id );

            setActivities(sortedActivities);

        } catch (error) {
            console.log("Kunde inte hämta aktiviteter:", error);
        }
    }

    useEffect(() => {
        loadActivities();
    }, []);

    async function handleDeleteActivity(id) {
        try {
            await deleteActivity(id);
            await loadActivities();

        } catch (error) {
            console.log("Kunde inte radera aktivitet:", error);
        }
    }

    return (
        <>
            <Card className="activity-card"
                sx={{
                    borderRadius: 3
                }}
            >
                <CardContent>

                    <Box className="activity-header">

                        <Typography variant="h6">
                            Aktiviteter
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={() => setOpen(true)}
                            sx={{
                                backgroundColor: '#6f5f8f',
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: '#594b75'
                                }
                            }}
                        >
                            Lägg till aktivitet
                        </Button>
                    </Box>
                    <Box className="activity-list">
                        {activities.length > 0 ? (
                            activities.map((activity) => (
                                <Box
                                    key={activity.id}
                                    className="activity-item"
                                    sx={{
                                        backgroundColor: '#F4F1F8',
                                        borderRadius: 2
                                    }}
                                >
                                    <Typography>
                                        {activity.activityType} {activity.totalTimeMinutes} min
                                    </Typography>

                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeleteActivity(activity.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))
                        ) : (
                            <Typography>
                                Inga aktiviteter loggade.
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>
            <ActivityModal
                open={open}
                onClose={() => setOpen(false)}
                todayLog={todayLog}
                onSave={loadActivities}
            />
        </>
    );
}