import {
    AppBar,
    Toolbar,
    Typography
} from '@mui/material';
import LogoutButton from '../logoutButton/LogoutButton';
import './Header.css';

export default function Header({ username }) {

    return (
        <AppBar position="static" className="header">
            <Toolbar className="header-toolbar">

                <Typography className="header-user"
                     sx={{
                        fontSize: '1.15rem',
                        fontWeight: 600
                     }}
                >
                    Hej {username}
                </Typography>

                <Typography
                    variant="h5"
                    className="header-logo"
                >
                    VibeTrack
                </Typography>

                <LogoutButton />

            </Toolbar>
        </AppBar>
    );
}