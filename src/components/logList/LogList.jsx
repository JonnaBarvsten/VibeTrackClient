import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './LogList.css';

export default function LogList({ logs = [], onDeleteLog }) {

    const sortedLogs = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <Paper
            className="log-container"
            sx={{
                borderRadius: 3
            }}
        >
            <Typography
                variant="h6"
                className="log-title"
            >
                Historik ({logs.length} loggar)
            </Typography>

            <Box className="log-scroll">
                <List className="log-list">

                    {sortedLogs.length > 0 ? (sortedLogs.map((log) => {

                            const sleep = log.dailyStats?.hoursOfSleep ?? '-';
                            const energy = log.dailyStats?.moodLogs?.[0]?.energyLevel ?? '-';
                            const stress = log.dailyStats?.moodLogs?.[0]?.stressLevel ?? '-';

                            return (
                                <ListItem
                                    key={log.id}
                                    className="log-item"
                                    sx={{
                                        backgroundColor: '#F4F1F8',
                                        borderRadius: 2
                                    }}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            color="error"
                                            onClick={() => onDeleteLog(log.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={new Date(log.date).toLocaleDateString('sv-SE')}
                                        secondary={`Sömn: ${sleep} h | Energi: ${energy} | Stress: ${stress}`}
                                    />
                                </ListItem>
                            );
                        })
                    ) : (
                        <ListItem>
                            <ListItemText primary="Inga loggar att visa." />
                        </ListItem>
                    )}

                </List>
            </Box>
        </Paper>
    );
}