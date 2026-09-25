import {
    Box,
    Typography,
    Button
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#DCD6E8',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box sx={{ textAlign: 'center' }}>

                <Typography
                    variant="h1"
                    sx={{
                        color: '#6f5f8f',
                        fontWeight: 600
                    }}
                >
                    404
                </Typography>

                <Typography
                    variant="h5"
                    sx={{
                        color: '#3F354D',
                        mb: 3
                    }}
                >
                    Sidan kunde inte hittas
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => navigate('/dashboard')}
                    sx={{
                        backgroundColor: '#6f5f8f',
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: '#594b75'
                        }
                    }}
                >
                    Tillbaka till dashboard
                </Button>

            </Box>
        </Box>
    );
}