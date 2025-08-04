// src/pages/SignUp.jsx

import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import api from '../api/api';
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
  Container
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../components/CustomIcons';


const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;


const AnimatedBackground = styled('div')({
  minHeight: '100vh',
  background: 'linear-gradient(-45deg, #00c6ff 0%, #0072ff 33%, #0047ab 66%, #001f54 100%)',
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 20s ease infinite`,
});

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

export default function SignUp(props) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree]       = useState(false);

 
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError]       = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitError, setSubmitError]     = useState('');


  const validateInputs = () => {
    let valid = true;
    if (!username.trim()) {
      setUsernameError('Username is required.');
      valid = false;
    } else setUsernameError('');
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else setEmailError('');
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      valid = false;
    } else setPasswordError('');
    if (!agree) {
      setSubmitError('You must accept to receive updates.');
      valid = false;
    } else setSubmitError('');
    return valid;
  };

 
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateInputs()) return;
    try {
      const res = await api.post('/Auth/register', {
        username, email, password
      });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/blog');
      } else {
        navigate('/signin');
      }
    } catch (err) {
      console.error('Register error:', err);
      setSubmitError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: 16, right: 16 }} />

      <AnimatedBackground>
        <Stack
          component={Container}
          maxWidth="sm"
          sx={{ minHeight: '100vh', justifyContent: 'center', py: 4 }}
        >
          <Card variant="outlined">
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <SitemarkIcon fontSize="large" />
              <Typography variant="h4">Sign up</Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ display: 'grid', gap: 2 }}
            >
              {/* Username */}
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <TextField
                  id="username"
                  name="username"
                  placeholder="yourusername"
                  required
                  fullWidth
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  error={!!usernameError}
                  helperText={usernameError}
                />
              </FormControl>

              {/* Email */}
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  fullWidth
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                />
              </FormControl>

              {/* Password */}
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••"
                  required
                  fullWidth
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </FormControl>

              {/* Updates Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agree}
                    onChange={e => setAgree(e.target.checked)}
                    color="primary"
                  />
                }
                label="I want to receive updates via email."
              />

              {/* Submission error */}
              {submitError && (
                <Typography color="error" variant="body2">
                  {submitError}
                </Typography>
              )}

              {/* Submit button */}
              <Button type="submit" variant="contained" fullWidth>
                Sign up
              </Button>
            </Box>

            <Divider sx={{ my: 2 }}>or</Divider>

            {/* Social Buttons */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => alert('Sign up with Google')}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={() => alert('Sign up with Facebook')}
            >
              Sign up with Facebook
            </Button>

            <Typography textAlign="center" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Typography
                component={RouterLink}
                to="/signin"
                color="primary"
                sx={{ textDecoration: 'none' }}
              >
                Sign in
              </Typography>
            </Typography>
          </Card>
        </Stack>
      </AnimatedBackground>
    </AppTheme>
  );
}
