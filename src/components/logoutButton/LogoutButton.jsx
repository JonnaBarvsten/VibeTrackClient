import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService";
import LogoutIcon from '@mui/icons-material/Logout';

export default function LogoutButton() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    return (
        <IconButton
            onClick={handleLogout}
            className="logout-button"
            sx={{
                color: 'white',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)'
                }
            }}
        >
            <LogoutIcon />
        </IconButton>
    );
}