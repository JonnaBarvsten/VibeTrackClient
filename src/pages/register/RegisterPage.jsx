import {Box} from '@mui/material'
import bgImage from '../../assets/login-bg.avif'
import RegisterForm from "../../components/registerForm/RegisterForm";

export default function RegistrerPage() {
    return (
           <Box
            sx = {{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: ' center bottom',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
              <RegisterForm />
        </Box>
    )
}