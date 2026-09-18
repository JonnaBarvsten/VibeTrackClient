import {Paper, Typography, TextField, Button} from '@mui/material';
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './RegisterForm.css'
import {register} from '../../services/AuthService'

export default function RegistrerForm (){
 
const navigate = useNavigate();

  const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: ""
  });

  const[errorMessage, setErrorMessage] = useState("");

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
    await register(formData);

    navigate("/login")
  } 
  catch(error){
    console.log(error)

    setErrorMessage("Registrering misslyckades. Kontrollera uppgifterna.");
  }
};

  return (
   <Paper className='registrer-card'
      sx={{
        backgroundColor: 'rgb(223, 171, 214)',
        borderRadius: 3
      }}
   >
    <Typography className='registrer-title'
      sx={{
        fontWeight: 'bold',
        fontSize: '25px'
      }}
    >
      VibeTrack
    </Typography>

    <form onSubmit={handleSubmit}>
      <TextField className='registrer-input'
        label='Förnamn'
        name='firstName'
        value={formData.firstName}
        onChange={handleChange}
      />

       <TextField className='registrer-input'
        label='Efternamn'
        name='lastName'
        value={formData.lastName}
        onChange={handleChange}
      />

       <TextField className='registrer-input'
        label='Email'
        name='email'
        value={formData.email}
        onChange={handleChange}
      />

       <TextField className='registrer-input'
        label='Användarnamn'
        name='username'
        value={formData.username}
        onChange={handleChange}
      />

      <TextField className='registrer-input'
        label='Lösenord'
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
      className='registrer-button'
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
      </form>

      <Button onClick={() => navigate("/login")}
      className='registrer-button'
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

   </Paper>
  )
};
