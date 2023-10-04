import React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Box, OutlinedInput, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useAuth } from './Contexts/authContext';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const { setAuthToken } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const userDetails = {
      "username": email,
      "password": password
    }

    loginUser(userDetails)
  };

  const loginUser = async (userDetails) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", userDetails)
      console.log(response.data)
      setAuthToken(response.data.token); // Set the token in the context

      alert("Login Successful")
      // history.push('/products')
      navigate('/products');
    }
    catch (error) {
      alert("Error Logging in")
    }
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mx: 'auto',
        height: '80vh', // Set height to 100% of viewport height
        width: '50ch',
      }}
    >
      <LockOutlinedIcon sx={{ color: 'white', bgcolor: '#f50057', borderRadius: '50%', padding: '5px' }} fontSize='large' />
      <Typography variant='h5'>Sign in</Typography>
      <FormControl margin="normal" required fullWidth>
        <TextField
          required
          id="outlined-required"
          label="Email Address"
          onChange={onEmailChange}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="outlined-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-password"
          type="password"
          label="Password"
          onChange={onPasswordChange}
        />
      </FormControl>


      <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
        SIGN IN
      </Button>


      Don't have an account? <Link to="/signup">Sign Up</Link>
    </Box>
  );
};

export default SignInForm;
