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
import './UserList.css';

export default function UserList({ users = [], onDelete }) {

    const sortedUsers = [...users].sort((a, b) => a.firstName.localeCompare(b.firstName));
    return (
        <Paper
            className="user-container"
            sx={{
                borderRadius: 3
            }}
        >
            <Typography
                variant="h6"
                className="user-title"
            >
                Användare ({users.length}st)
            </Typography>

            <Box className="user-scroll">
                <List className="user-list">

                    {sortedUsers.length > 0 ? (sortedUsers.map((user) => {

                            return (
                                <ListItem
                                    key={user.id}
                                    className="user-item"
                                    sx={{
                                        backgroundColor: '#F4F1F8',
                                        borderRadius: 2
                                    }}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            color="error"
                                            onClick={() => onDelete(user.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary={`${user.firstName} ${user.lastName}`}
                                        secondary={`${user.email} | Användarnamn: ${user.username}`}
                                    />
                                </ListItem>
                            );
                        })
                    ) : (
                        <ListItem>
                            <ListItemText primary="Inga användare att visa." />
                        </ListItem>
                    )}

                </List>
            </Box>
        </Paper>
    );
}