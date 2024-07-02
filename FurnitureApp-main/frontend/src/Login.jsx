import React from 'react';
import { Container, CssBaseline, Avatar, Typography, TextField, Button, Grid, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const theme = createTheme();

export default function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8000/auth/google/start', { withCredentials: true });
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error starting OAuth flow:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <a href="#" variant="body2">
                  Forgot password?
                </a>
              </Grid>
              <Grid item>
                <a href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </a>
              </Grid>
            <div className='flex justify-center items-center gap-1   border border-black p-1.5 rounded-lg'>
                <FcGoogle className='h-7 w-7' />
                <button onClick={handleGoogleLogin} className='text-lg  '>Continue with Google</button>
            </div>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
