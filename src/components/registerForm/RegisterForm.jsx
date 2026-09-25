import {Paper, Typography, TextField, Button} from '@mui/material';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './RegisterForm.css';
import {register} from '../../services/AuthService';

export default function RegistrerForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
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

        if (!formData.firstName.trim()) {
            newErrors.firstName = "Förnamn måste fyllas i";
        }
        else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = "Förnamn måste vara minst 2 tecken";
        }
        else if (formData.firstName.trim().length > 50) {
            newErrors.firstName = "Förnamn får vara max 50 tecken";
        }


        if (!formData.lastName.trim()) {
            newErrors.lastName = "Efternamn måste fyllas i";
        }
        else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = "Efternamn måste vara minst 2 tecken";
        }
        else if (formData.lastName.trim().length > 50) {
            newErrors.lastName = "Efternamn får vara max 50 tecken";
        }


        if (!formData.email.trim()) {
            newErrors.email = "E-post måste fyllas i";
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Ange en giltig e-postadress";
        }


        if (!formData.username.trim()) {
            newErrors.username = "Användarnamn måste fyllas i";
        }
        else if (formData.username.trim().length < 3) {
            newErrors.username = "Användarnamn måste vara minst 3 tecken";
        }
        else if (formData.username.trim().length > 30) {
            newErrors.username = "Användarnamn får vara max 30 tecken";
        }


        if (!formData.password) {
            newErrors.password = "Lösenord måste fyllas i";
        }
        else if (formData.password.length < 6) {
            newErrors.password = "Lösenord måste vara minst 6 tecken";
        }
        else if (formData.password.length > 100) {
            newErrors.password = "Lösenord får vara max 100 tecken";
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {

        e.preventDefault();
        setErrorMessage("");

        if (!validateForm()) {
            return;
        }

        try {

            await register(formData);

            navigate("/login");

        }
        catch (error) {

            console.log(error);

            setErrorMessage(error.response?.data?.message || "Registrering misslyckades. Kontrollera uppgifterna.");
        }
    };


    return (
        <Paper
            className="registrer-card"
            sx={{
                backgroundColor: '#E5B8DC',
                borderRadius: 3
            }}
        >

            <Typography
                variant="h4"
                className="registrer-title"
            >
                VibeTrack
            </Typography>

            <Typography className="registrer-subtitle">
                Skapa ett konto
            </Typography>

            <form
                className="registrer-form"
                onSubmit={handleSubmit}
            >

                <TextField
                    fullWidth
                    label="Förnamn"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                    sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: 2
                    }}
                />

                <TextField
                    fullWidth
                    label="Efternamn"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                    sx={{
                        backgroundColor: '#ffffff',
                        borderRadius: 2
                    }}
                />

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
                    label="Användarnamn"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={Boolean(errors.username)}
                    helperText={errors.username}
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
                        className="registrer-error"
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
                    Registrera
                </Button>

            </form>


            <Typography className="login-text">
                Har du redan ett konto?
            </Typography>

            <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/login")}
                sx={{
                    backgroundColor: '#F4F1F8',
                    color: '#6f5f8f',
                    borderRadius: 2,
                    '&:hover': {
                        backgroundColor: '#DCD6E8'
                    }
                }}
            >
                Logga in
            </Button>

        </Paper>
    );
}