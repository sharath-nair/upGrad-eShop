import React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Typography, InputLabel, OutlinedInput } from '@mui/material';
import axios from 'axios';

const SignUpForm = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [contactNumber, setContactNumber] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber) {
      // Display an error message or handle the error appropriately
      alert("Please fill all the mandatory fields")
      return;
    };
    const userDetails = {
      "email": email,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
      "contactNumber": contactNumber
  }
    console.log(userDetails)
    createUser(userDetails)
  }

  const createUser = async(userDetails) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', userDetails);
      alert("User Created Successfully!")
      window.location.reload();
    }
    catch (error) {
      alert ("Error while creating user")
    }
  }  

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mx: 'auto',
        width: '50ch',
      }}
    >
      <LockOutlinedIcon sx={{ color: 'white', bgcolor: '#f50057', borderRadius: '50%', padding: '5px' }} fontSize='large' />
      <Typography variant='h5'>Sign Up</Typography>
      <FormControl margin="normal" required fullWidth>
        <TextField
          required
          id="outlined-required"
          value={firstName}
          label="First Name"
          onChange={(event) => setFirstName(event.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <TextField
          required
          id="outlined-required"
          value={lastName}
          label="Last Name"
          onChange={(event) => setLastName(event.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <TextField
          required
          id="outlined-required"
          value={email}
          label="Email Address"
          onChange={(event) => setEmail(event.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="outlined-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-password"
          type="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="outlined-password">Confirm Password</InputLabel>
        <OutlinedInput
          id="outlined-password"
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <TextField
          required
          id="outlined-required"
          label="Contact Number"
          value={contactNumber}
          onChange={(event) => { console.log(typeof(contactNumber)); setContactNumber(event.target.value)}}
        />
      </FormControl>

      <FormControl margin="normal" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
        <Checkbox />
        <FormLabel>I agree to the terms and conditions</FormLabel>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
        SIGN UP
      </Button>
      <Link href="/sign-in">Already have an account? Sign In</Link>
    </Box>
  );
};

export default SignUpForm;
