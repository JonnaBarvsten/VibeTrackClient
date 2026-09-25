import {
    Paper,
    Typography,
    TextField,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { useState } from 'react';
import { login } from '../../services/AuthService';

export default function LoginForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    };

    const validateForm = () => {

        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "E-post måste fyllas i";
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Ange en giltig e-postadress";
        }

        if (!formData.password) {
            newErrors.password = "Lösenord måste fyllas i";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrorMessage("");

        if (!validateForm()) {
            return;
        }

        try {
            await login(formData.email, formData.password);

            navigate("/dashboard");
        }
        catch (error) {
            console.log(error);

            setErrorMessage("Fel e-post eller lösenord.");
        }
    };

    return (
        <Paper
            className="login-card"
            sx={{
                backgroundColor: '#E5B8DC',
                borderRadius: 3
            }}
        >
            <Typography
                variant="h4"
                className="login-title"
            >
                VibeTrack
            </Typography>

            <Typography className="login-subtitle">
                Logga in på ditt konto
            </Typography>

            <form
                className="login-form"
                onSubmit={handleSubmit}
            >
                <TextField
                    fullWidth
                    label="E-post"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: 2
                    }}
                />

                <TextField
                    fullWidth
                    label="Lösenord"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: 2
                    }}
                />

                {errorMessage && (
                    <Typography
                        className="login-error"
                        color="error"
                    >
                        {errorMessage}
                    </Typography>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: '#6f5f8f',
                        borderRadius: 2,
                        '&:hover': {
                            backgroundColor: '#594b75'
                        }
                    }}
                >
                    Logga in
                </Button>
            </form>

            <Typography className="register-text">
                Har du inget konto?
            </Typography>

            <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/register")}
                sx={{
                    backgroundColor: '#F4F1F8',
                    color: '#6f5f8f',
                    borderRadius: 2,
                    '&:hover': {
                        backgroundColor: '#DCD6E8'
                    }
                }}
            >
                Registrera
            </Button>
        </Paper>
    );
}