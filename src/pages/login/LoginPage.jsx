import {Box} from '@mui/material'
import bgImage from '../../assets/login-bg.avif';
import LoginForm from '../../components/loginForm/LoginForm';

export default function LoginPage() {
   
   
   
   
    return(
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
              <LoginForm />
        </Box>
    )
}