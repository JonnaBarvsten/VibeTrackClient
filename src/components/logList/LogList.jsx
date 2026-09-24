import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Box,
    Divider
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

export default function LogList({ logs = [], onDeleteLog }) {

    const sortedLogs = [...logs].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
                Historik ({logs.length} loggar)
            </Typography>

            <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                <List>
                    {sortedLogs.length > 0 ? (
                        sortedLogs.map((log, index) => {
                            const sleep = log.dailyStats?.hoursOfSleep ?? '-';
                            const energy = log.dailyStats?.moodLogs?.[0]?.energyLevel ?? '-';
                            const stress = log.dailyStats?.moodLogs?.[0]?.stressLevel ?? '-';

                            return (
                                <Box key={log.id}>
                                    <ListItem
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

                                    {index < sortedLogs.length - 1 && <Divider />}
                                </Box>
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