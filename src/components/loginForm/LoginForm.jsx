import {Paper, Typography, TextField, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { useState } from 'react';
import {login} from '../../services/AuthService'

export default function LoginForm (){
 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState(""); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage("");

      try{
        await login(formData.email, formData.password);
        console.log("LOGIN LYCKADES!");
        navigate("/dashboard")
      } 
      catch(error){
        console.log(error)

        setErrorMessage("Inloggning misslyckades!")
      }
  };

  return (
   <Paper className='login-card'
      sx={{
        backgroundColor: 'rgb(223, 171, 214)',
        borderRadius: 3
      }}
   >
    <Typography className='login-title'
      sx={{
        fontWeight: 'bold',
        fontSize: '25px'
      }}
    >
      VibeTrack

    
    </Typography>
    
    <form onSubmit={handleSubmit}>
      <TextField className='login-input'
        label='email'
        name='email'
        value={formData.email}
        onChange={handleChange}
      />

      <TextField className='login-input'
        label='Password'
        type='password'
        name='password'
        value={formData.password}
        onChange={handleChange}
      />

      {errorMessage && (
         <Typography>
        {errorMessage}
        </Typography>
      )}

      <Button type='submit'
      className='login-button'
        sx={{
          backgroundColor: 'rgb(243, 229, 245)'
        }}
      >
        <Typography className='button-title'
          sx={{
            fontWeight: 'bold',
            letterSpacing: '1px',
          }}
        >
           Logga In
        </Typography>
       
      </Button>
      </form>

      <Button onClick={() => navigate("/register")}
      className='login-button'
        sx={{
          backgroundColor: 'rgb(243, 229, 245)'
        }}
      >
        <Typography className='button-title'
          sx={{
            fontWeight: 'bold',
            letterSpacing: '1px',
          }}
        >
         Registrera
        </Typography>
      </Button>

   </Paper>
  )
};
